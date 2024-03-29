import React from 'react'
import image from '../Images/bkg2.webp';
import NavbarContext from '../components/NavbarContext';
import { useContext } from 'react';
const Home = () => {
  const navbarHeight = useContext(NavbarContext);
    return (
        <div className="home-container">
          <div className="centered-content">
            <h2 style={{ position: 'relative', zIndex: 1,color:'white', fontWeight:'bold', fontFamily:'helvetica', fontSize: '600%' ,top:'0%' }}>Medical Sonography<br/> Logbook</h2>
            <img
              src={image}
              alt=""
              className="center-image"
              style={{
                position: 'absolute',
                top: `${navbarHeight}px`, // Set top margin dynamically
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '70%',
                height: 'auto',
                zIndex: 0
              }}
            />
          </div>
        </div>
      );
}

export default Home
