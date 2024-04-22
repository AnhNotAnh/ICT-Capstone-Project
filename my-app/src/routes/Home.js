import React from 'react'
import image from '../Images/UniSABackground.jpg';
import NavbarContext from '../components/NavbarContext';
import { useContext } from 'react';
const Home = () => {
  const navbarHeight = useContext(NavbarContext);
    return (
        <div className="home-container">
          <div className="centered-content">
            <h2 style={{ position: 'relative', zIndex: 1,color:'white', fontWeight:'bold', fontFamily:'helvetica', fontSize: '300%' ,top:'-40%' }}>Medical Sonography<br/> Logbook</h2>
            <img
              src={image}
              alt=""
              className="center-image"
              style={{
                position: 'absolute',
                top: `${navbarHeight}px`, 
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '49%',
                height: 'auto',
                zIndex: 0
              }}
            />
          </div>
        </div>
      );
}

export default Home
