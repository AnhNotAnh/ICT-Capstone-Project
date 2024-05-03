import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Register = () => {
  
  const [role, setRole] = useState("STUDENT");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhoneNumb] = useState("");
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");
  // const [suburb, setSuburb] = useState("");
  // const [street, setStreet] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Insert user's info into the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Student's info
    if (role === "STUDENT") {
      const userInfo = {
        studentID: studentID,
        name: fName + " " + lName,
        email: email,
        phoneNumber: phone,
        username: username,
        password: password,
        role: role
      };
      try {
        const response = await fetch(`http://localhost:8081/registerStudent`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
          throw new Error(`Failed to create account`);
        }
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }
    // Supervisor's info
    else {
      const userInfo = {
        //assume we don't need supervisorID
        name: fName + " " + lName,
        email: email,
        phoneNumber: phone,
        username: username,
        password: password,
        role: role,
      };
      console.log(userInfo);
      try {
        const response = await fetch(`http://localhost:8081/registerSupervisor`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if (!response.ok) {
          throw new Error(`Failed to create account`);
        }
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
              <div className="card-body p-0">
                <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Registration Form</b></h3>
                <div className="row p-3 mb-4 pb-2">
                  <div className="col-md-6 mb-4 pb-2">
                    <label style={{color:"black"}} className="form-label label-style">Role</label>
                    <select value={role} className='form-select' onChange={(e) => (setRole(e.target.value))} required>
                      <option value="">Select role (default role is student) </option>
                      <option value="STUDENT">Student</option>
                      <option value="SUPERVISOR">Supervisor</option>
                    </select>
                  </div>
                  {(role === "STUDENT") && <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">Student ID</label>
                      <input type="number" className="form-control form-control-md" value={studentID} placeholder="Student ID"
                      onChange={(e)=>(setStudentID(e.target.value))} required>
                      </input>
                    </div>
                  </div>}
                </div>
                <div className="row p-3">
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">First Name</label>
                      <input type="text" className="form-control form-control-md" value={fName} placeholder="First Name"
                      onChange={(e)=>(setfName(e.target.value))} required>
                      </input>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">Last Name</label>
                      <input type="text" className="form-control form-control-md" value={lName} placeholder="Last Name"
                      onChange={(e)=>(setlName(e.target.value))} required></input>
                    </div>
                  </div>
                </div>
                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Phone Number</label>
                      <input type="text" className="form-control form-control-md" value={phone} placeholder="Phone Number"
                      onChange={(e)=>(setPhoneNumb(e.target.value))}></input>
                    </div>  
                  </div> 
                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Email Address</label>
                      <input type="text" className="form-control form-control-md" value={email} placeholder="Email Address"
                      onChange={(e)=>(setEmail(e.target.value))}></input>
                    </div>  
                  </div> 
                </div>
                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style" >User Name</label>
                      <input type="text" className="form-control form-control-md" value={username} placeholder="User Name"
                      onChange={(e)=>(setUserName(e.target.value))}></input>
                    </div>  
                  </div> 
                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Password</label>
                      <input type="password" className="form-control form-control-md" value={password} placeholder="Password"
                      onChange={(e)=>(setPassword(e.target.value))}></input>
                    </div>  
                  </div> 
                </div>
                {/* let imagine success register will lead to signIn page*/}
                <Link to="/SignIn">
                  <button type="button" className="btn btn-success">Create</button> 
                </Link>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
