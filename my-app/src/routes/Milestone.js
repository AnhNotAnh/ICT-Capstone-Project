import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import data from '../data.json';


const Milestone = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [milestone, setMilestone] = useState(0);
    const [studentSignature, setSignature] = useState('');
    const { studentID } = useParams();
    const [supervisorID, setSupervisorID] = useState(0);
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisors, setSupervisors] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const [rows, setRows] = useState(data);

    //Store data and send email to supervisor
    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedAnswers = rows.map((row, index) => ({
            question: row.title,
            // Add up all the selected answers into a string for each row
            answer: row.selectedAnswer.join('; '),
            }));

        const answersToInsert = {
            sectionA: null,
            sectionB: null,
            sectionC: null,
            sectionD: null,
            sectionE: null,
            sectionF: null,
            sectionG: null,
        };  

        try{
            if (selectedAnswers.every(answerObj => answerObj.answer.trim() !== '')) {
                console.log('Total answers : ' + selectedAnswers.length);
                //Transform the selected answers into the format that the backend expects
                selectedAnswers.forEach((row) => {
                    switch (row.question) {
                        case 'A) Initiative and enterprise':
                            answersToInsert.sectionA = row.answer;
                            break;
                        case 'B) Learning, evaluating and reflecting':
                            answersToInsert.sectionB = row.answer;
                            break;
                        case 'C) Self-Management':
                            answersToInsert.sectionC= row.answer;
                            break;
                        case 'D) Problem solving skills':
                            answersToInsert.sectionD = row.answer;
                            break;
                        case 'E) Communication skills':
                            answersToInsert.sectionE = row.answer;
                            break;
                        case 'F) Technology and resource':
                            answersToInsert.sectionF = row.answer;
                            break;
                        case 'G) Hands on Scanning':
                            answersToInsert.sectionG = row.answer;
                            break;
                        default:
                        console.error('Invalid section:', row.question);
                    }
                });
                setErrorMessage(null);
                console.log('Answers to insert:', answersToInsert);
            }
            else {
                setErrorMessage('Please fill in all the answers !!!');
                return;
            }
            const response = await fetch(`http://localhost:8081/submitMilestone`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentID: studentID,
                    studentSignature: studentSignature,
                    supervisorID: supervisorID,
                    milestoneAchievement: milestone,
                    status: 0,
                    answers: answersToInsert,
                    role: 'STUDENT'
                }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            try {
                const data = await response.json();
                console.log('Success:', data.message);
                window.alert(data.message + ', you now will be redirected to the logbook page');
                navigate(`/logbook/${studentID}`);
                
            } catch (error) {
                console.log('No data returned from server');
            }
        }
        catch (error) {
            console.error('Error: ', error);
        }

        //EmailJS Format to send email to supervisor
        //Replace these 3 keys with 3 keys (including serviceID, templateID, publicKey) that you have when you register an EmailJS service
        const serviceID = process.env.REACT_APP_SERVICE_ID;
        const templateID = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        const emailParams = {
        from_name: name,
        from_email: email,
        to_email: supervisorEmail, //an chosen email from list of supervisor is the email that notification will be sent to. 
        to_name: supervisorName,
        message: 'Your student have finished milestone document, please come to the Logbook website to review and sign off !'
        }
        emailjs.send(serviceID, templateID, emailParams, publicKey)
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
        })
        .catch(error => {
            console.log('FAILED...', error);
        });
    }
    //student's information
    useEffect(() => {
        fetch(`http://localhost:8081/getStudent/${studentID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch supervision for student ID: ${studentID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setEmail(data.studentEmail);
            setName(data.studentName);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [studentID])

    //supervision information
    useEffect(() => {
        fetch(`http://localhost:8081/getSupervision/${studentID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch supervision for student ID: ${studentID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setSupervisors(data);
            console.log(data);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [studentID])

return (
    <div className="container">
        <form onSubmit={handleSubmit} className="new-milestone">
            <div className="row justify-content-center mb-4">
                <div className="col-8">
                    <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
                    <div className="card-body p-0">
                        <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Summary of Student progress at the end of every 400 scans milestone
                        (Mandatory)</b></h3>
                        <div className="row p-3 mb-4 pb-2">
                            <div className="col-md-6 mb-4 pb-2">
                                <label style={{color:"black"}} className="form-label label-style">Send to Supervisor</label>
                                <select value={supervisorID} required className='form-select' 
                                onChange={(e) => {
                                const selectedSupervisor = supervisors.find(superV => superV.supervisorID === Number(e.target.value));
                                if (selectedSupervisor) {
                                    setSupervisorEmail(selectedSupervisor.email);
                                    setSupervisorName(selectedSupervisor.name);
                                    setSupervisorID(selectedSupervisor.supervisorID);
                                }
                                }}>
                                    <option value="">Select supervisor you want to send to </option>
                                    {supervisors.map((supervisor, index) => 
                                    <option key={index} value={supervisor.supervisorID}>{supervisor.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <label style={{color:"black"}} className="form-label label-style">Milestone Achievement</label>
                                <select value={milestone} className='form-select' onChange={(e) => (setMilestone(e.target.value))} required>
                                <option value="">Select your milestone achievement </option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="1200">1200</option>
                                <option value="1600">1600</option>
                                <option value="1800">1800</option>
                                <option value="2000">2000</option>
                                </select>
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Full Name</label>
                                <input type="text" className="form-control form-control-md" value={name} placeholder="Full Name"
                                onChange={(e)=>(setName(e.target.value))} required>
                                </input>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Email</label>
                                <input type="email" className="form-control form-control-md" value={email} placeholder="Student Email"
                                onChange={(e)=>(setEmail(e.target.value))} disabled required>
                                </input>
                                </div>
                            </div>
                        </div>
                        <div className='row p-3'>
                            <div className='col-md-6 mb-4 pb-2'>
                                <div className="form-outline form-white">
                                <label style={{color:"black"}} className="form-label label-style">Student Signature</label>
                                <input type="text" className="form-control form-control-md" value={studentSignature} placeholder="Student Signature"
                                onChange={(e)=>(setSignature(e.target.value))} required></input>
                                </div>  
                            </div>
                        </div>  
                    </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                <h4 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>SECTION A: Performance Self-Appraisal <i>(TO BE COMPLETED BY THE TRAINEE SONOGRAPHER)</i></b></h4>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '30%'}}>
                                    <span>
                                        <u>Professional capabilities</u><br/>
                                        <p style={{fontWeight : 'normal'}}>
                                        Trainee sonographers are required to meet 
                                        the ASA Competency Standards and ASA <br/>
                                        Code of Conduct.
                                        </p>
                                    </span>
                                </th>
                                <th scope="col" style={{width: '17.5%'}}>Significant need for improvement</th>
                                <th scope="col" style={{width: '17.5%'}}>Novice</th>
                                <th scope="col" style={{width: '17.5%'}}>Advanced beginner</th>
                                <th scope="col" style={{width: '17.5%'}}>Competent</th>
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th scope="row" style={{textAlign: 'left', fontWeight: 'normal'}}>
                                {row.exam && <strong style={{color:'red'}}>{row.exam}<br/></strong>}
                                <strong>{row.title}</strong>
                                {row.subtitle && <p>{row.subtitle}</p>}
                                {row.questions.map((dot, dotIndex) => (
                                    <p style={{margin: '0em'}} key={dotIndex}>•{dot.question}</p>
                                ))}
                            </th>
                            {row.columns.map((column, columnIndex) => (
                            <td key={columnIndex}>
                            {column.answers.map((answer, answerIndex) => (
                                <label htmlFor={`${rowIndex}-${columnIndex}-${answerIndex}`} key={answerIndex} style={{textAlign: 'left', marginBottom: '1em'}}>
                                <input 
                                    type="checkbox" 
                                    id={`${rowIndex}-${columnIndex}-${answerIndex}`} 
                                    name={`${rowIndex}-${columnIndex}-${answerIndex}`} 
                                    checked={answer.checked}
                                    onChange={() => {
                                    const newRows = [...rows];
                                    //If checked, uncheck it, if unchecked, check it
                                    newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked = !newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked;
                                    //Allow to select multiple answers, each answer is a string which is stored in an array called selectedAnswer.
                                    if (newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked) {
                                        newRows[rowIndex].selectedAnswer = [...(newRows[rowIndex].selectedAnswer || []), answer.label];
                                    } else {
                                        // If the answer is unchecked, remove it from the selected answers
                                        newRows[rowIndex].selectedAnswer = (newRows[rowIndex].selectedAnswer || []).filter(selected => selected !== answer.label);
                                    }
                                    setRows(newRows);
                                    console.log(`Number of Selected answer for row ${rowIndex + 1}: ${newRows[rowIndex].selectedAnswer.length}`);
                                    }} 
                                />
                                {answer.label}
                                </label>
                            ))}
                        </td>
                        ))}
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <label style={{color:"black"}}>
                    <input type="checkbox" required/>I have read and understood the above information and I certify that the information I have provided is true and accurate.
                </label><br/>
                <button type="submit" className="btn btn-primary mb-2 mt-2">Submit</button>  
            </div>
        </form>
    </div>
    )
}

export default Milestone
