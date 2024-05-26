import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        selectedAnswer: '',
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
        title: 'B) Learning, evaluating and reflecting and Self-Management ',
        questions: [ 
            {question: 'Trainee critically evaluates and reflects on own performance, learns from errors and shows commitment to improvement in order to establish lifelong learning skills and career management .'},
            {question: 'Trainee uses reflective practice to organise self and manage realistic goals.'},
            {question: 'Trainee is calm under pressure.'}
            ],
        selectedAnswer: '',
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
                    { label: 'Shows some initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to professional role', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: 'Identifies with role and clarifies requirements with some degree of guidance from supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: 'Able to establish professional role requirements, adapts with minimal or no guidance from supervisor', checked: false },
                ],
                },
            ],
        },
        { 
        title: 'A) Initiative and enterprise:',
        questions: [ 
            {question: 'Trainee establishes professional role within scope of practice.'},
            {question: 'Trainee is goal directed, motivated and a team player.'},
            {question: ' Trainee delivers safe patient centred services.'},
            {question: ' Trainee respects patient diversity.' },
            {question: ' Trainee practices within professional and ethical frameworks.'},
            {question: ' Trainee promotes a safe and healthy workplace environment and conforms to organisational protocols for maintaining standards and quality assurance. This also includes infection prevention and control as well as housekeeping issues such as room preparation'}
            ],
        selectedAnswer: '',
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: 'Shows NO initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to the role', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: 'Shows some initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to professional role', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: 'Identifies with role and clarifies requirements with some degree of guidance from supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: 'Able to establish professional role requirements, adapts with minimal or no guidance from supervisor', checked: false },
                ],
                },
            ],
        },
        { 
        title: 'A) Initiative and enterprise:',
        questions: [ 
            {question: 'Trainee establishes professional role within scope of practice.'},
            {question: 'Trainee is goal directed, motivated and a team player.'},
            {question: ' Trainee delivers safe patient centred services.'},
            {question: ' Trainee respects patient diversity.' },
            {question: ' Trainee practices within professional and ethical frameworks.'},
            {question: ' Trainee promotes a safe and healthy workplace environment and conforms to organisational protocols for maintaining standards and quality assurance. This also includes infection prevention and control as well as housekeeping issues such as room preparation'}
            ],
        selectedAnswer: '',
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: 'Shows NO initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to the role', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: 'Shows some initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to professional role', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: 'Identifies with role and clarifies requirements with some degree of guidance from supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: 'Able to establish professional role requirements, adapts with minimal or no guidance from supervisor', checked: false },
                ],
                },
            ],
        },
        { 
        title: 'A) Initiative and enterprise:',
        questions: [ 
            {question: 'Trainee establishes professional role within scope of practice.'},
            {question: 'Trainee is goal directed, motivated and a team player.'},
            {question: ' Trainee delivers safe patient centred services.'},
            {question: ' Trainee respects patient diversity.' },
            {question: ' Trainee practices within professional and ethical frameworks.'},
            {question: ' Trainee promotes a safe and healthy workplace environment and conforms to organisational protocols for maintaining standards and quality assurance. This also includes infection prevention and control as well as housekeeping issues such as room preparation'}
            ],
        selectedAnswer: '',
        columns: [
                { 
                label: 'Significant need for improvement', 
                answers: [
                    { label: 'Shows NO initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to the role', checked: false },
                ],
                },
                { 
                label: 'Novice', 
                answers: [
                    { label: 'Shows some initiative and enterprise', checked: false },
                    { label: 'Requires a high degree of guidance from supervisor to identify and adapt to professional role', checked: false },
                ],
                },
                { 
                label: 'Advanced beginner', 
                answers: [
                    { label: 'Identifies with role and clarifies requirements with some degree of guidance from supervisor', checked: false },
                ],
                },
                { 
                label: 'Competent', 
                answers: [
                    { label: 'Able to establish professional role requirements, adapts with minimal or no guidance from supervisor', checked: false },
                ],
                },
            ],
        }
        ]);

    const selectedAnswers = rows.map((row, index) => ({
        question: row.title,
        answer: row.selectedAnswer
        }));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const serviceID = process.env.REACT_APP_SERVICE_ID;
        const templateID = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        const emailParams = {
        from_name: name,
        from_email: email,
        to_email: supervisorEmail,
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
    <>
    <div className="container">
        <div className="row justify-content-center mb-4">
            <div className="col-8">
                <form onSubmit={handleSubmit} className="new-registration">
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
                                setSupervisorID(selectedSupervisor.id);
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
                            <option value="400">400</option>
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
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>    
                </div>
                </div>
                </form>
            </div>
        </div>
        {/* <div className="row">
        <div className="col-11">
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" style={{width: '30%'}}>
                        <strong><u>Professional capabilities</u></strong>
                        <p style={{fontWeight: 'normal'}}>Trainee sonographers are required to meet
                        the ASA Competency Standards and ASA
                        Code of Conduct.</p>
                    </th>
                    <th scope="col" style={{width: '17.5%'}}>Significant need for improvement </th>
                    <th scope="col" style={{width: '17.5%'}}>Novice</th>
                    <th scope="col" style={{width: '17.5%'}}>Advanced beginner</th>
                    <th scope="col" style={{width: '17.5%'}}>Competent</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" style={{textAlign: 'left', fontWeight: 'normal'}}>
                        <p>
                        <strong>A) Initiative and enterprise:</strong> <br/>
                            • Trainee establishes professional role within scope of practice <br/>
                            • Trainee is goal directed, motivated and a team player <br/>
                            • Trainee delivers safe patient centred services <br/>
                            • Trainee respects patient diversity <br/>
                            • Trainee practices within professional and ethical frameworks <br/>
                            • Trainee promotes a safe and healthy workplace environment and conforms to organisational protocols for maintaining standards and quality assurance. This also includes infection prevention and control as well as housekeeping issues such as room preparation
                        </p>
                    </th>
                    <td>
                        <label htmlFor="noInitiative"> <input type="checkbox" id="noInitiative" name="noInitiative" />
                        Shows NO initiative and enterprise</label>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
            </table>
        </div>
        </div> */}
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
                    <label htmlFor={`${rowIndex}-${columnIndex}-${answerIndex}`} key={answerIndex}>
                    <input 
                        type="checkbox" 
                        id={`${rowIndex}-${columnIndex}-${answerIndex}`} 
                        name={`${rowIndex}-${columnIndex}-${answerIndex}`} 
                        checked={answer.checked}
                        onChange={() => {
                        const newRows = [...rows];
                        newRows[rowIndex].columns.forEach((column) => {
                            column.answers.forEach((answer) => {
                            answer.checked = false;
                            });
                        });
                        newRows[rowIndex].columns[columnIndex].answers[answerIndex].checked = true;
                        newRows[rowIndex].selectedAnswer = answer.label;
                        setRows(newRows);
                        console.log(`Selected answer for row ${rowIndex + 1}: ${answer.label}`);
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
    </>
    )
}

export default Milestone
