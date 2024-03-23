import React from 'react'
import image from '../Images/bkg2.webp';


const Home = () => {
    return (
        <div className="home-container">
          <div className="centered-content">
            <h2 style={{ position: 'relative', zIndex: 1 }}>Medical Sonography Logbook</h2>
            <img
              src={image}
              alt=""
              className="center-image"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '80vw', height: 'auto', zIndex: 0 }}
            />
          </div>
        </div>
      );
}

export default Home
