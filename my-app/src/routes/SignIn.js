import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//USERNAME SIGN IN : TESTUSER
//PASSWORD : TESTPASSWORD


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/validateStudent', { username, password });
  
      if (response.data.validation) {
        setLoginSuccess(true);
        setError('');
        setStudentId(response.data.studentId); // Set studentId in state
        console.log('Student ID:', response.data.studentId);
        console.log('Login successful');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Student Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '10px', width: '100%' }} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px', width: '100%' }} />
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        {loginSuccess ? (
        <Link to={`/Student_Home/${studentId}`} style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
        </Link>
          ) : (
            <button type="submit" onClick={handleSubmit} style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
          )}
      </form>
    </div>
  );
};

export default SignIn;