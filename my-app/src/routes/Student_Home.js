import React from 'react';
import { Link } from 'react-router-dom';

const Student_Home = () => {
    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1.2em',
        borderRadius: '5px',
        margin: '5px',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
        textDecoration: 'none'
    };

const underLine = {
      textDecoration: 'underline'
};   


    return (
        <div>
            <h2>Home Page</h2>
            <p style={underLine}>Please select your logbook</p>
            <button style={buttonStyle}>General Logbook</button>
            <Link to={"/StudentHome/CoursePage"} style={{ textDecoration: 'none' }}><button style={buttonStyle}>Cardiac Logbook</button></Link>
            <button style={buttonStyle}>Vascular Logbook</button>
            <Link to="/Supervisor_Details">
                <button style={{position:'absolute',top:'40px',right:'10px' }}>Supervisor Details</button>
            </Link>
            <Link to="/Current_Supervisor">
                <button style={{ position: 'absolute', top: '40px', left: '1224px' }}>Current Supervisor</button>
            </Link>
        </div>
    );
};

export default Student_Home;