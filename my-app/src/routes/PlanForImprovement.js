import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import data from '../data.json';


const PlanForImprovement = () => {
    const [supervisorSignature, setSignature] = useState('');
    const { milestoneID } = useParams();
    const navigate = useNavigate();
    const [milestoneDocObj, setMilestoneDocObj] = useState({studentSignature: '', milestoneAchievement: 0});
    const [studentObj, setStudentObj] = useState({name: '', email: '', sectionA: '', sectionB: '', sectionC: '', sectionD: '', sectionE: '', sectionF: '', sectionG: ''});
    const [supervisorObj, setSupervisorObj] = useState({name: '', email: '', sectionA: '', sectionB: '', sectionC: '', sectionD: '', sectionE: '', sectionF: '', sectionG: ''});
    const [supervisorComment, setSupervisorComment] = useState('');
    const [supervisorDate, setSupervisorDate] = useState('');
    const [studentDate, setStudentDate] = useState('');
    const [planID, setPlanID] = useState(0);
    const [planStrategy, setPlanStrategy] = useState('');

    //Fetch milestone, milestone doc, student and supervisor information.
    useEffect(() => {
        fetch(`http://localhost:8081/getSSMilestone/${milestoneID}`)
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
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [milestoneID])

    //Load data from JSON file for student
    const [rows, setRows] = useState(data);
    const [supervisorRows, setSupervisorRows] = useState(data);

    //Update the default table with the student's answers
    useEffect(() => {
        //Load each answer section of student from milestone document into a list, to present answers.
        const preSelectedAnswers = {
            0: studentObj.sectionA?.split('; '),
            1: studentObj.sectionB?.split('; '),
            2: studentObj.sectionC?.split('; '),
            3: studentObj.sectionD?.split('; '),
            4: studentObj.sectionE?.split('; '),
            5: studentObj.sectionF?.split('; '),
            6: studentObj.sectionG?.split('; '),
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
    }, [studentObj]);

    //Update the default table with the supervisor's answers
    useEffect(() => {
        //Load each answer section of student from milestone document into a list, to present answers.
        const preSelectedAnswers = {
            0: supervisorObj.sectionA?.split('; '),
            1: supervisorObj.sectionB?.split('; '),
            2: supervisorObj.sectionC?.split('; '),
            3: supervisorObj.sectionD?.split('; '),
            4: supervisorObj.sectionE?.split('; '),
            5: supervisorObj.sectionF?.split('; '),
            6: supervisorObj.sectionG?.split('; '),
        };

        setSupervisorRows(rows => {
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
    }, [supervisorObj]);

    //Get supetvisor comments and consent date
    useEffect(() => {
        fetch(`http://localhost:8081/getSupervisorPlan/${milestoneID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch plan for milestone ID: ${milestoneID}`
                );
            }
            return res.json();
        })
        .then((data) => {
            setSupervisorComment(data.comment);
            setSupervisorDate(data.supervisorDate);
            setPlanID(data.planID);
            console.log("Plan ID is " + data.planID);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, [milestoneID]);

    //Store data and send email to supervisor
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8081/updatePlan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planID: planID,
                    planStrategy: planStrategy,
                    studentDate: studentDate,
                    planStatus: 1
                }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            try {
                const data = await response.json();
                console.log('Success:', data.message);
                // window.alert(data.message + ', you now will be redirected to the supervisor home page !');
                // navigate(`/Supervisor_Home/${supervisorObj.accountID}`);
                
            } catch (error) {
                console.log('No data returned from server');
            }
        }
        catch (error) {
            console.error('Error: ', error);
        }
        // EmailJS Format to send email to supervisor

        // const serviceID = process.env.REACT_APP_SERVICE_ID;
        // const templateID = process.env.REACT_APP_TEMPLATE_ID;
        // const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        // const emailParams = {
        // from_name: studentObj.name,
        // from_email: studentObj.email,
        // to_email: supervisorObj.email,
        // to_name: supervisorObj.name,
        // message: 'Your student has completed plan for improvement, come to Milestone Summary to review !'
        // }
        // emailjs.send(serviceID, templateID, emailParams, publicKey)
        // .then(response => {
        //     console.log('SUCCESS!', response.status, response.text);
        // })
        // .catch(error => {
        //     console.log('FAILED...', error);
        // });
    }


return (
    <div className="container">
        <form onSubmit={handleSubmit} className="new-milestone">
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
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Supervisor Signature</label>
                                <input type="text" className="form-control form-control-md" value={milestoneDocObj.supervisorSignature || ''} disabled></input>
                                </div>  
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                                <div className="form-outline">
                                <label style={{color:"black"}} className="form-label label-style">Student Signature</label>
                                <input type="text" className="form-control form-control-md" value={milestoneDocObj.studentSignature} disabled></input>
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
            <div className='row'>
                <div className='col-12'>
                    <h4 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>SECTION B: Performance Appraisal <i>(TO BE COMPLETED BY THE TRAINEE’S SUPERVISOR)</i></b></h4>
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
                        {supervisorRows.map((row, rowIndex) => (
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
            <div className='row'>   
                <div className='col-12'>
                    <label htmlFor='supervisorComment'><i>Any additional Supervisor comments: </i></label>
                    <textarea className="form-control" id="supervisorComment" rows="10" placeholder="Comments" value={supervisorComment} disabled></textarea>
                </div>
            </div>
            <div className='row'>   
                <div className='col-12'>
                    <p style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '2em'}}>ACTION PLAN FOR IMPROVEMENT: (To be completed by trainee in consultation with Supervisor)</p>
                    <p style={{ textAlign: 'left'}}>This section identifies specific goals, objectives and deadlines. Trainee sonographer reflects on his/her own performance appraisal.</p>
                    <p style={{ textAlign: 'left'}}>The action plan requires that the student reflects on their own performance appraisal and the appraisal provided by their tutor/ supervisor.</p>
                    <p style={{ textAlign: 'left'}}>During this discussion SMART goals (Specific, Measurable, Achievable, Realistic and Timely) must be set and recoded below.</p>
                    <p style={{ textAlign: 'left'}}>Please attach an extra page if necessary.</p>
                    <textarea className="form-control" id="supervisorComment" rows="10" placeholder="Plan..." value={planStrategy} onChange={(e) => setPlanStrategy(e.target.value)} ></textarea>
                </div>
            </div>
            <div>
                <table className="table table-bordered mt-3" style={{textAlign: 'left'}}>
                    <thead>
                        <tr>
                        <th scope="col" style={{fontSize : 'small'}}>Trainee Declaration</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" colSpan="2" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small'}}>
                                <p>
                                I confirm that: <br />
                                • The above is an accurate record of the issues discussed and the advice I have received during my clinical training review. <br />
                                • I understand the advice I have received <br/>
                                • A copy of this completed form will be scanned and submitted to the University of South Australia as proof of progress of clinical training and a copy will be retained for 
                                workplace and trainee records for the purpose of ASAR requirements.<br />
                                </p>
                            </th>
                        </tr>
                        {/* <tr>
                            <th scope="row" colSpan="2" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small'}}>3</th>
                        </tr> */}
                        <tr>
                            <th scope="row" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small', width: '70%'}}>
                            Trainee Signature: {milestoneDocObj.studentSignature}
                            </th>
                            <td>
                                <label style={{marginRight: '1em'}}> Date:</label>
                                <input type='date' placeholder="dd/mm/yyyy" value={studentDate} onChange={(e) => setStudentDate(e.target.value)} required></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered mt-3" style={{textAlign: 'left'}}>
                    <thead>
                        <tr>
                        <th scope="col" style={{fontSize : 'small'}}>Clinical Supervisor Declaration</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" colSpan="2" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small'}}>
                                <p>
                                I confirm that: <br />
                                • The above is an accurate record of the issues discussed and the advice I have provided during this training review. <br />
                                • A copy of this completed form will be scanned and submitted to the University of South Australia as proof of progress of clinical training and a copy will be retained for 
                                workplace and trainee records for the purpose of ASAR requirements. <br /> 
                                • I am required to contact the course coordinator at the University of South Australia if there are any concerns with the trainee’s training and progress. <br />
                                </p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" colSpan="2" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small'}}>Clinical Supervisor’s  name: {supervisorObj.name}</th>
                        </tr>
                        {/* <tr>
                            <th scope="row" colSpan="2" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small'}}>3</th>
                        </tr> */}
                        <tr>
                            <th scope="row" style={{textAlign: 'left', fontWeight: 'normal', fontSize : 'small', width: '70%'}}>
                                Clinical Supervisor’s signature: {milestoneDocObj.supervisorSignature}
                            </th>
                            <td>
                                <label style={{marginRight: '1em'}}> Date:</label>
                                <input type='date' placeholder="dd/mm/yyyy" value={supervisorDate} disabled></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary mb-2 mt-2">Submit</button>  
            </div>
        </form>
    </div>
    )
}

export default PlanForImprovement
