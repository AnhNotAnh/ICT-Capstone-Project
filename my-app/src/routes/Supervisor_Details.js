import React, { useState } from 'react';

const Supervisor_Details = () => {
    const [numSupervisors, setNumSupervisors] = useState(1);

    const handleAddSupervisor = () => {
        setNumSupervisors(numSupervisors + 1);
    };

    const handleConfirmSupervisor = (index) => {
        // Add logic to handle confirmation for the supervisor at the specified index
        console.log(`Supervisor at index ${index} confirmed`);
    };

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

                    <button onClick={() => handleConfirmSupervisor(index)} style={{ marginBottom: '10px' }}>Confirm</button>
                </div>
            ))}
            <p style={{ color: 'red' }}>Note: Please note once you click update there will be an automated email sent to the supervisor</p>

            <button onClick={handleAddSupervisor} style={{ marginBottom: '10px' }}>Add More Supervisors</button>
        </div>
    );
};

export default Supervisor_Details;