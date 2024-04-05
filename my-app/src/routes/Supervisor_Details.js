import React from 'react'


const Supervisor_Details = () => {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
        <h2>This page is used for updating your supervisor details and information.</h2>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>
            <label htmlFor="supervisorEmail">Supervisor's Email</label>
            <input type="email" id="supervisorEmail" name="supervisorEmail" style={{ marginBottom: '10px', width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />

            <label htmlFor="supervisorName">Supervisor's Name</label>
            <input type="text" id="supervisorName" name="supervisorName" style={{ marginBottom: '10px', width: '100%', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            
            <p style={{color:'red'}}>Note: Please note once you click update there will be a automated email sent to the supervisor</p>
            
            <button type="submit" style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: '1px solid white', borderRadius: '3px', cursor: 'pointer' }}>Update Supervisor Details</button>
        </form>

        </div>
);
}

export default Supervisor_Details
