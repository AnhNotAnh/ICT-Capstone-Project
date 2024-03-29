import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Register = () => {
  
  const [role, setRole] = useState("Student");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhoneNumb] = useState("");
  const [email, setEmail] = useState("");
  // const [postCode, setPostCode] = useState("");
  // const [suburb, setSuburb] = useState("");
  // const [street, setStreet] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card mt-4" style={{borderRadius: 15 + "px"}}>
              <div className="card-body p-0">
          
                <h3 className="fw-normal mb-4 mt-4" style={{color:"black"}}><b>Registration Form</b></h3>
                <div className="p-3 mb-4 pb-2">
                  <select defaultValue={role} className='form-select' onSelect={(e) => (setRole(e.target.value))}>
                    <option value="Student">Select role (default role is student) </option>
                    <option value="Student">Student</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                </div>

                <div className="row p-3">
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">First Name</label>
                      <input type="text" className="form-control form-control-md" value={fName} placeholder="First Name"
                      onChange={(e)=>(setfName(e.target.value))}>
                      </input>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4 pb-2">
                    <div className="form-outline">
                      <label style={{color:"black"}} className="form-label label-style">Last Name</label>
                      <input type="text" className="form-control form-control-md" value={lName} placeholder="Last Name"
                      onChange={(e)=>(setlName(e.target.value))}></input>
                    </div>
                  </div>
                </div>
                {/* only if we need address           
                <div className="p-3 mb-4 pb-2">
                  <div className='form-outline form-white'>
                    <label style={{color:"black"}} className="form-label label-style">Street Address</label>
                    <input type="text" className="form-control form-control-md" value={street} placeholder="Street Address"
                      onChange={(e)=>(setStreet(e.target.value))}></input>
                  </div>
                </div>
                <div className='row p-3'>
                  <div className='col-md-5 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Post Code</label>
                      <input type="text" className="form-control form-control-md" value={postCode} placeholder="Post Code"
                      onChange={(e)=>(setPostCode(e.target.value))}></input>
                    </div>  
                  </div> 
                  <div className='col-md-7 mb-4 pb-2'>
                    <div className="form-outline form-white">
                      <label style={{color:"black"}} className="form-label label-style">Suburb</label>
                      <input type="text" className="form-control form-control-md" value={suburb}  placeholder="Suburb"
                      onChange={(e)=>(setSuburb(e.target.value))}></input>
                    </div>  
                  </div> 
                </div>
                 */}
                
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
