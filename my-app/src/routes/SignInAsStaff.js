import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInAsStaff = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter username and password');
      return;
  }

  try {
      const response = await axios.post('http://localhost:8081/validateStaff', { username, password });

      console.log('Response data:', response.data);

      if (response.data.validation && (response.data.role === 'STAFF' || response.data.role === 'ADMIN' || response.data.role === 'SUPERVISOR')) {
          setLogin(true);
          console.log('Login successful');
          console.log('Role:', response.data.role);
          console.log('Account ID:', response.data.accountId);

          if (response.data.role === 'SUPERVISOR') {
              navigate(`/Supervisor_Home/${response.data.accountId}`); // Navigate to SupervisorHome if role is SUPERVISOR
          } else {
              navigate('/Staff_Home'); // Navigate to Staff_Home for other roles
          }
      } else {
          setError('Access denied');
      }
  } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
  }
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Staff Login Page</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '10px', width: '100%' }} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '10px', width: '100%' }} />
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
      </form>
      {login && <p style={{ marginTop: '10px' }}>Logging in...</p>}
    </div>
  );
};


export default SignInAsStaff;