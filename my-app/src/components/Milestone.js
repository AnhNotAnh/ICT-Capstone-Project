import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const Milestone = () => {
    const [email, setEmail] = useState('');
    const [emailTo, setEmailTo] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [milestone, setMilestone] = useState(0);
    const [studentSignature, setSignature] = useState('');
    const { studentID } = useParams();
    const [supervisorID, setSupervisorID] = useState(0);
    const [supervisorName, setSupervisionName] = useState('');
    const [supervisorEmail, setSupervisionEmail] = useState('');
    const [supervisors, setSupervisors] = useState([]);
    const [student, setStudent] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const serviceID = process.env.REACT_APP_SERVICE_ID;
        const templateID = process.env.REACT_APP_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_PUBLISH_KEY;

        const emailParams = {
        from_name: name,
        from_email: email,
        to_email: emailTo,
        to_name: 'Your Supervisor name',
        message: message
        }

        emailjs.send(serviceID, templateID, emailParams, publicKey)
        .then(response => {
            console.log('SUCCESS!', response.status, response.text);
            setName('');
            setEmail('');
            setEmailTo('');
            setMessage('');
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
        <div className="row justify-content-center">
            <div className="col-8">
                <form onSubmit={handleSubmit} className="new-registration">
                <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
                <div className="card-body p-0">
                    <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Summary of Student progress at the end of 2000 scan milestone
                    (Mandatory)</b></h3>
                    <div className="row p-3 mb-4 pb-2">
                        <div className="col-md-6 mb-4 pb-2">
                            <label style={{color:"black"}} className="form-label label-style">Send to Supervisor</label>
                            <select value={emailTo} className='form-select' onChange={(e) => (setEmailTo(e.target.value))} required>
                                <option value="">Select supervisor you want to send to </option>
                                {supervisors.map((supervisor, index) => 
                                <option key={index} value={supervisor.email}>{supervisor.name}</option>
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
                            onChange={(e)=>(setEmail(e.target.value))} required>
                            </input>
                            </div>
                        </div>
                        {/* <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                            <label style={{color:"black"}} className="form-label label-style">Student Given Name</label>
                            <input type="text" className="form-control form-control-md" value={fName} placeholder="First Name"
                            onChange={(e)=>(setfName(e.target.value))} required>
                            </input>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                            <div className="form-outline">
                            <label style={{color:"black"}} className="form-label label-style">Student Family Name</label>
                            <input type="text" className="form-control form-control-md" value={lName} placeholder="Last Name"
                            onChange={(e)=>(setlName(e.target.value))} required></input>
                            </div>
                        </div> */}
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
                    <button type="submit" className="btn btn-success mb-2">Create</button>    
                </div>
                </div>
                </form>
            </div>
        </div>
    </div>
    {/* <div>
        <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
                <div className="col-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="Supervisor">Supervisor's email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Supervisor"
                        required
                        placeholder="Supervisor's Email here"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </div>
                <div className="col-3">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        className="form-control"
                        cols="30"
                        rows="10"
                        id="text"
                        required
                        placeholder="Your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    /> 
                </div>
            </div> 
            <button type="submit" className="btn btn-primary">Send Email</button>
        </form>
    </div> */}
    </>
  )
}

export default Milestone
