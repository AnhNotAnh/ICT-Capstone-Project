import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


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

    const [rows, setRows] = useState([
        { 
        title: 'A) Initiative and enterprise',
        questions: [ 
            {question: 'Trainee establishes professional role within scope of practice.'},
            {question: 'Trainee is goal directed, motivated and a team player.'},
            {question: ' Trainee delivers safe patient centred services.'},
            {question: ' Trainee respects patient diversity.' },
            {question: ' Trainee practices within professional and ethical frameworks.'},
            {question: ' Trainee promotes a safe and healthy workplace environment and conforms to organisational protocols for maintaining standards and quality assurance. This also includes infection prevention and control as well as housekeeping issues such as room preparation'}
            ],
        selectedAnswer: [],
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: ' Shows NO initiative and enterprise', checked: false },
                    { label: ' Requires a high degree of guidance from supervisor to identify and adapt to the role', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: ' Shows some initiative and enterprise', checked: false },
                    { label: ' Requires a high degree of guidance from supervisor to identify and adapt to professional role', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: ' Identifies with role and clarifies requirements with some degree of guidance from supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: ' Able to establish professional role requirements, adapts with minimal or no guidance from supervisor', checked: false },
                ],
                },
            ],
        },
        { 
        title: 'B, C) Learning, evaluating and reflecting and Self-Management',
        questions: [ 
            {question: 'Trainee critically evaluates and reflects on own performance, learns from errors and shows commitment to improvement in order to establish lifelong learning skills and career management .'},
            {question: 'Trainee uses reflective practice to organise self and manage realistic goals.'},
            {question: 'Trainee is calm under pressure.'}
            ],
        selectedAnswer: [],
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: ' Self-evaluations are brief, cursory and not used to improve  performance even after prompting by supervisor', checked: false },
                    { label: ' Justifies personal decisions and choices without evaluating them ', checked: false },
                    { label: ' Trainee is unable to see the need for improvement  ', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: ' Evaluates own performance at a basic level using simple criteria to understand and reflect on the role ', checked: false },
                    { label: ' Demonstrates awareness of the need for ongoing improvement and makes some effort to learn from experience and improve performance', checked: false },
                    { label: ' Able to set some goals for improvement with a high level of guidance from the supervisor ', checked: false },
                ],  
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: ' Evaluates own performance at a basic level using simple criteria to understand and reflect on the role ', checked: false },
                    { label: ' Demonstrates awareness of the need for ongoing improvement and makes some effort to learn from experience and improve performance', checked: false },
                    { label: ' Able to set some goals for improvement with a moderate level of guidance from the supervisor ', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: ' Adequately monitors and evaluates own performance ', checked: false },
                    { label: ' Demonstrates a desire and commitment to ongoing improvement', checked: false },
                    { label: ' Accurately identifies strengths and weaknesses ', checked: false },
                    { label: ' Sets goals for improvement with minimal or no guidance from the supervisor ', checked: false }
                ],
                },
            ],
        },
        { 
        title: 'D) Problem solving skills',
        questions: [ 
            {question: 'Trainee demonstrates problem solving skills including planning and organisation and decision making in a range of clinical contexts.'}
            ],
        selectedAnswer: [],
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: ' Has difficulty focusing and appears not to know what information is important for diagnosis', checked: false },
                    { label: ' Even in simple familiar situations, trainee has difficulty interpreting or making sense of the data ', checked: false },
                    { label: ' Requires significant assistance in interpretation of data ', checked: false },
                    { label: ' Unable to make adjustments as indicated by the patient’s response or the clinical situation', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: ' Makes some decisions and makes an effort to prioritise data and tasks and focus on the most important, but also attends to less relevant or less useful data ', checked: false },
                    { label: ' Requires a high level of assistance in interpretation of data', checked: false },
                    { label: ' Involved but unable to make adjustments as indicated by the patient’s response or the clinical situation.', checked: false },
                    { label: ' Needs high degree of guidance from the supervisor ', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: ' Plans sequencing and timing of tasks and recognises priorities and usually focuses on relevant ata ', checked: false },
                    { label: ' Able to make some adjustments as indicated by the patient’s response or the clinical situation', checked: false },
                    { label: ' Seeks feedback or advice to make decisions ', checked: false },
                    { label: ' Moderate degree of guidance required from the supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: ' Takes responsibility for workload and prioritises tasks  ', checked: false },
                    { label: ' Generally focuses on the most important data, redefines problems, clarifies key issues and seeks further relevant information to generate possible solutions ', checked: false },
                    { label: ' Works independently in a wide range of areas', checked: false },
                    { label: ' Needs minimal guidance from the supervisor', checked: false },
                ],
                },
            ],
        },
        { 
        title: 'E) Communication skills',
        questions: [ 
            {question: ' Trainee communicates effectively with patients'},
            {question: ' Trainee communicates effectively with other professionals '}
            ],
        selectedAnswer: [],
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: ' Difficulty communicating with staff and patients', checked: false },
                    { label: ' Except in simple situations, trainee is stressed/disorganised and unable to communicate well', checked: false },
                    { label: ' Patients and families are made confused and anxious and are not reassured.', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: ' Is tentative', checked: false },
                    { label: ' Shows some communication ability (e.g. giving directions)', checked: false },
                    { label: ' Communication with patients, families and team members is successful in routine and simple situations', checked: false },
                    { label: ' Becomes stressed and disorganised easily ', checked: false },
                    { label: ' Displays caring but not fully competent', checked: false },
                    { label: ' Requires considerable guidance to communicate specified knowledge and understanding', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: ' Generally communicates well', checked: false },
                    { label: ' Explains carefully to the patients ', checked: false },
                    { label: ' Gives clear directions to the team', checked: false },
                    { label: ' Is able to control or stay calm in most situations ', checked: false },
                    { label: ' Could be more effective in establishing rapport', checked: false },
                    { label: ' Displays caring and mostly communicates well with patient and other professionals', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: ' Assumes responsibility', checked: false },
                    { label: ' Has a calm and confident manner ', checked: false },
                    { label: ' Assesses patients confidently, checks for their understanding and displays caring whilst reassuring them and their families ', checked: false },
                    { label: ' Communicates well with other professionals', checked: false }
                ],
                },
            ],
        },
    ]);

    //Store data and send email to supervisor
    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedAnswers = rows.map((row, index) => ({
            question: row.title,
            answer: row.selectedAnswer
            }));

        const answersToInsert = {
            sectionA: null,
            sectionBC: null,
            sectionD: null,
            sectionE: null,
        };  

        try{
            if (selectedAnswers.length > 0 && selectedAnswers[0].answer !== '' && selectedAnswers[1].answer !== '' && selectedAnswers[2].answer !== '' && selectedAnswers[3].answer !== '') {
                console.log('Total answers : ' + selectedAnswers.length);
                //Transform the selected answers into the format that the backend expects
                selectedAnswers.forEach((row) => {
                    switch (row.question) {
                        case 'A) Initiative and enterprise':
                            answersToInsert.sectionA = row.answer;
                        break;
                        case 'B, C) Learning, evaluating and reflecting and Self-Management':
                            answersToInsert.sectionBC = row.answer;
                        break;
                        case 'D) Problem solving skills':
                            answersToInsert.sectionD = row.answer;
                        break;
                        case 'E) Communication skills':
                            answersToInsert.sectionE = row.answer;
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
        
        // const serviceID = process.env.REACT_APP_SERVICE_ID;
        // const templateID = process.env.REACT_APP_TEMPLATE_ID;
        // const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        // const emailParams = {
        // from_name: name,
        // from_email: email,
        // //to_email: supervisorEmail, real email
        // to_email: 'quocanh01082020@gmail.com',
        // to_name: supervisorName,
        // message: 'Your student have finished milestone document, please come to the Logbook website to review and sign off !'
        // }
        // emailjs.send(serviceID, templateID, emailParams, publicKey)
        // .then(response => {
        //     console.log('SUCCESS!', response.status, response.text);
        // })
        // .catch(error => {
        //     console.log('FAILED...', error);
        // });
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
                        <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Summary of Student progress at the end of 400 scan milestone
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
                                <option value="800">800</option>
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
                                <strong>{row.title}</strong>
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
