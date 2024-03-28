import React from 'react'

const SignIn = () => {
  return (
 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
  <h2>Student Sign In</h2>
  <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', minWidth: '300px' }}>        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" style={{ marginBottom: '10px', width: '100%' }} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" style={{ marginBottom: '10px', width: '100%' }} />
        <button type="submit" style={{ width: '100%', padding: '5px', background: 'blue', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  )
}

export default SignIn
