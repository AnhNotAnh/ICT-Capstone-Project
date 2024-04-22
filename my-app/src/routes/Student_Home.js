import React from 'react'
import {Link} from 'react-router-dom'

const Student_Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Please select your logbook</p>
        <button>General Logbook</button>
        <Link to={"/StudentHome/CoursePage"} ><button>Cardiac Logbook</button></Link>
        <button>Vascular Logbook</button>
        <Link to="/Supervisor_Details">
          <button style={{ position: 'absolute', top: '10px', right: '10px' }}>Supervisor Details</button>
        </Link>
      
    </div>

  );
};

export default Student_Home
