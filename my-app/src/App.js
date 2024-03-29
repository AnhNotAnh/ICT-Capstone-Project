import UniSALogo from '../src/Images/unisa logo white.webp';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import NavbarContext from './components/NavbarContext';
import React , { useState, useEffect, useRef } from 'react';

function App() {

    const navRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        setNavbarHeight(navRef.current.offsetHeight);
      }, []);

  return (
    <NavbarContext.Provider value={navbarHeight}>
        <div className="App">
            <nav ref={navRef} className="navbar navbar-expand-lg navbar-light custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={UniSALogo} alt="Logo" style={{ width: "100px", height: "auto" }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="Home" style={{color:'white'}}>Home</Link>
                            <Link className="nav-link" to="About" style={{color:'white'}}>About</Link>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:'white'}}>
                                    Login
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="SignIn" >Sign in for Student</Link></li>
                                    <li><Link className="dropdown-item" to="SignInAsStaff" >Sign in for Staff</Link></li>
                                    <li><Link className="dropdown-item" to="Register" >Register</Link></li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    </NavbarContext.Provider>
  );
}

export default App;
