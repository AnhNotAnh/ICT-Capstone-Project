import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
//import { useParams } from 'react-router-dom';

const Supervisor_Details = () => {
 //   const {studentID} = useParams();
    const [numSupervisors, setNumSupervisors] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
   // const [sentEmail, setSentEmail] = useState([]);

    const handleAddSupervisor = () => {
        setNumSupervisors(numSupervisors + 1);
    };

    const handleConfirmSupervisor = (index) => {
        const supervisorEmailInput = document.getElementById(`supervisorEmail${index}`);
        const supervisorEmail = supervisorEmailInput ? supervisorEmailInput.value : null;
        const supervisorName = document.getElementById(`supervisorName${index}`).value;
        const supervisorQualification = document.getElementById(`supervisorQualification${index}`).value;
    
        /*
        if (!supervisorEmail) {
            console.error('Supervisor email is empty');
            return;
        }

        */

        emailjs.send('service_otfz7pr', 'template_g28nptg', {
            name: supervisorName,
            to: supervisorEmail,
            from: 'sonographymedical@gmail.com',
            body: `Hello ${supervisorName},\n\nPlease confirm your details on the UniSA Medical Sonography website .`
        }, '9So_wYKnefvG9Mdqr')
        .then(() => {
            console.log('Email Sent Successfully');
            setShowAlert(true);
        })
        .catch((error) => {
            console.error('Error sending email', error);
        });
    
        console.log(`Supervisor at index ${index} confirmed`);
    };

    //testing purpose
  //  useEffect(() => {
   //     console.log('Emails sent to:', sentEmails);
   // }, [sentEmails]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>This page is used for updating your supervisor details and information.</h2>
            {[...Array(numSupervisors)].map((_, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px', marginBottom: '20px' }}>
                    <label htmlFor={`supervisorEmail${index}`}>Supervisor's Email</label>
                    <input
                        type="email"
                        id={`supervisorEmail${index}`}
                        name={`supervisorEmail${index}`}
                        style={{ marginBottom: '10px', width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                    />

                    <label htmlFor={`supervisorName${index}`}>Supervisor's Name</label>
                    <input
                        type="text"
                        id={`supervisorName${index}`}
                        name={`supervisorName${index}`}
                        style={{ marginBottom: '10px', width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                    />
                    <label htmlFor={`supervisorQualification${index}`}>Supervisor's Qualification</label>
                    <input
                        type="text"
                        id={`supervisorQualification${index}`}
                        name={`supervisorQualification${index}`}
                        style={{ marginBottom: '10px', width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
                    />

                    <button onClick={() => handleConfirmSupervisor(index)} style={{ marginBottom: '10px' }}>Confirm</button>
                </div>
            ))}

            {showAlert && <p style={{ color: 'green' }}>An email has been sent to your supervisor advising them to confirm their details.</p>}
            <p style={{ color: 'red' }}>Note: Please note once you click update there will be an automated email sent to the supervisor</p>

            <button onClick={handleAddSupervisor} style={{ marginBottom: '10px' }}>Add More Supervisors</button>
        </div>
    );
};

export default Supervisor_Details;
