import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const SignInAsStaff = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [Login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/validatePassword', { username, password });

      if (response.data.validation) {
        setLogin(true);
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
    <h2>Staff Login Page</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>        <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" style={{ marginBottom: '10px', width: '100%' }} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" style={{ marginBottom: '10px', width: '100%' }} />
          <Link to= "/Staff_Home">
            <button type="submit" style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
          </Link>   
      </form>
      </div>
  )

};

export default SignInAsStaff;
