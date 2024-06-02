import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import data from '../data.json';


const SupervisorMilestone = () => {
    // const [email, setEmail] = useState('');
    // const [name, setName] = useState('');
    // const [milestone, setMilestone] = useState(0);
    const [supervisorSignature, setSignature] = useState('');
    const { milestoneID } = useParams();
    const [supervisorID, setSupervisorID] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [milestoneDocObj, setMilestoneDocObj] = useState({studentSignature: '', milestoneAchievement: 0 , sectionA: '', sectionB: '', sectionC: '', sectionD: '', sectionE: '', sectionF: '', sectionG: ''});
    const [studentObj, setStudentObj] = useState({name: '', email: '', studentID: 0});
    const [supervisorObj, setSupervisorObj] = useState({name: '', email: '', supervisorID: 0});

    //Fetch milestone, milestone doc, student and supervisor information.
    useEffect(() => {
        fetch(`http://localhost:8081/getSupervisorMilestone/${milestoneID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch milestone from milestone ID: ${milestoneID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setMilestoneDocObj(data.docObj);
            setStudentObj(data.studentObj);
            setSupervisorObj(data.supervisorObj);
            console.log(data.docObj);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [milestoneID])

    //Load data from JSON file
    const [rows, setRows] = useState(data);

    useEffect(() => {
        //Load each answer section of student from milestone document into a list, to present answers.
        const preSelectedAnswers = {
            0: milestoneDocObj.sectionA?.split('; '),
            1: milestoneDocObj.sectionB?.split('; '),
            2: milestoneDocObj.sectionC?.split('; '),
            3: milestoneDocObj.sectionD?.split('; '),
            4: milestoneDocObj.sectionE?.split('; '),
            5: milestoneDocObj.sectionF?.split('; '),
            6: milestoneDocObj.sectionG?.split('; '),
        };

        setRows(rows => {
            const newRows = rows.map((row, rowIndex) => {
                if (preSelectedAnswers[rowIndex]) {
                    // Create a new copy of the row
                    const newRow = { ...row, selectedAnswer: row.selectedAnswer || [] };
                    newRow.columns = newRow.columns.map(column => {
                        // Create a new copy of the column
                        const newColumn = { ...column };
                        newColumn.answers = newColumn.answers.map(answer => {
                            // Create a new copy of the answer
                            const newAnswer = { ...answer };
                            // Check if this answer is in the pre-selected answers for this section
                            if (preSelectedAnswers[rowIndex].includes(newAnswer.label)) {
                                newAnswer.checked = true;
                                // Add this answer to the selectedAnswer array for this row
                                newRow.selectedAnswer = [...newRow.selectedAnswer, newAnswer.label];
                            }
                            return newAnswer;
                        });
                        return newColumn;
                    });
                    return newRow;
                }
                return row;
            });
    
            // Only update rows if the new value is different from the current value
            if (JSON.stringify(newRows) !== JSON.stringify(rows)) {
                return newRows;
            }
    
            // If no changes, return the original state
            return rows;
        });
    }, [milestoneDocObj]);


    //Store data and send email to supervisor
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const selectedAnswers = rows.map((row, index) => ({
    //         question: row.title,
    //         // Add up all the selected answers into a string for each row
    //         answer: row.selectedAnswer.join(', '),
    //         }));

    //     const answersToInsert = {
    //         sectionA: null,
    //         sectionB: null,
    //         sectionC: null,
    //         sectionD: null,
    //         sectionE: null,
    //         sectionF: null,
    //         sectionG: null,
    //     };  

    //     try{
    //         if (selectedAnswers.every(answerObj => answerObj.answer.trim() !== '')) {
    //             console.log('Total answers : ' + selectedAnswers.length);
    //             //Transform the selected answers into the format that the backend expects
    //             selectedAnswers.forEach((row) => {
    //                 switch (row.question) {
    //                     case 'A) Initiative and enterprise':
    //                         answersToInsert.sectionA = row.answer;
    //                         break;
    //                     case 'B) Learning, evaluating and reflecting':
    //                         answersToInsert.sectionB = row.answer;
    //                         break;
    //                     case 'C) Self-Management':
    //                         answersToInsert.sectionC= row.answer;
    //                         break;
    //                     case 'D) Problem solving skills':
    //                         answersToInsert.sectionD = row.answer;
    //                         break;
    //                     case 'E) Communication skills':
    //                         answersToInsert.sectionE = row.answer;
    //                         break;
    //                     case 'F) Technology and resource':
    //                         answersToInsert.sectionF = row.answer;
    //                         break;
    //                     case 'G) Hands on Scanning':
    //                         answersToInsert.sectionG = row.answer;
    //                         break;
    //                     default:
    //                     console.error('Invalid section:', row.question);
    //                 }
    //             });
    //             setErrorMessage(null);
    //             console.log('Answers to insert:', answersToInsert);
    //         }
    //         else {
    //             setErrorMessage('Please fill in all the answers !!!');
    //             return;
    //         }
    //         const response = await fetch(`http://localhost:8081/submitMilestone`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 studentID: studentID,
    //                 studentSignature: studentSignature,
    //                 supervisorID: supervisorID,
    //                 milestoneAchievement: milestone,
    //                 status: 0,
    //                 answers: answersToInsert,
    //             }),
    //         })
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         try {
    //             const data = await response.json();
    //             console.log('Success:', data.message);
    //             window.alert(data.message + ', you now will be redirected to the logbook page');
    //             navigate(`/logbook/${studentID}`);
                
    //         } catch (error) {
    //             console.log('No data returned from server');
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error: ', error);
    //     }
    //     // EmailJS Format to send email to supervisor

    //     // const serviceID = process.env.REACT_APP_SERVICE_ID;
    //     // const templateID = process.env.REACT_APP_TEMPLATE_ID;
    //     // const publicKey = process.env.REACT_APP_PUBLISH_KEY;

    //     // const emailParams = {
    //     // from_name: name,
    //     // from_email: email,
    //     // //to_email: supervisorEmail, real email
    //     // to_email: 'quocanh01082020@gmail.com',
    //     // to_name: supervisorName,
    //     // message: 'Your student have finished milestone document, please come to the Logbook website to review and sign off !'
    //     // }
    //     // emailjs.send(serviceID, templateID, emailParams, publicKey)
    //     // .then(response => {
    //     //     console.log('SUCCESS!', response.status, response.text);
    //     // })
    //     // .catch(error => {
    //     //     console.log('FAILED...', error);
    //     // });
    // }


return (
    <div className="container">
        {/* <form onSubmit={handleSubmit} className="new-milestone"> */}
            <div className="row justify-content-center mb-4">
                <div className="col-8">
                    <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
                    <div className="card-body p-0">
                        <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Summary of Student progress at the end of {milestoneDocObj.milestoneAchievement} scan milestone
                        (Mandatory)</b></h3>
                        <div className="row p-3">
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Full Name</label>
                                <input type="text" className="form-control form-control-md" value={studentObj.name} disabled>
                                </input>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Email</label>
                                <input type="email" className="form-control form-control-md" value={studentObj.email} disabled>
                                </input>
                                </div>
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Supervisor Full Name</label>
                                <input type="text" className="form-control form-control-md" value={supervisorObj.name} disabled>
                                </input>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Supervisor Email</label>
                                <input type="email" className="form-control form-control-md" value={supervisorObj.email} disabled>
                                    
                                </input>
                                </div>
                            </div>
                        </div>
                        <div className='row p-3'>
                            <div className='col-md-6 mb-4 pb-2'>
                                <div className="form-outline form-white">
                                <label style={{color:"black"}} className="form-label label-style">Supervisor Signature</label>
                                <input type="text" className="form-control form-control-md" value={supervisorSignature} placeholder="Supervisor Signature"
                                onChange={(e)=>(setSignature(e.target.value))} required></input>
                                </div>  
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Signature</label>
                                <input type="text" className="form-control form-control-md" value={milestoneDocObj.studentSignature} disabled>
                                </input>
                                </div>
                            </div>
                        </div>  
                    </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '30%'}}>Question</th>
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
                                {row.subtitle && <p style={{color: 'black'}}>{row.subtitle}</p>}
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
                                    // onChange={() => {
                                    // const newRows = [...rows];
                                    // //If checked, uncheck it, if unchecked, check it
                                    // newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked = !newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked;
                                    // //Allow to select multiple answers, each answer is a string which is stored in an array called selectedAnswer.
                                    // if (newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked) {
                                    //     newRows[rowIndex].selectedAnswer = [...(newRows[rowIndex].selectedAnswer || []), answer.label];
                                    // } else {
                                    //     // If the answer is unchecked, remove it from the selected answers
                                    //     newRows[rowIndex].selectedAnswer = (newRows[rowIndex].selectedAnswer || []).filter(selected => selected !== answer.label);
                                    // }
                                    // setRows(newRows);
                                    // console.log(`Number of Selected answer for row ${rowIndex + 1}: ${newRows[rowIndex].selectedAnswer.length}`);
                                    // }} 
                                    disabled
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
        {/* </form> */}
    </div>
    )
}

export default SupervisorMilestone
