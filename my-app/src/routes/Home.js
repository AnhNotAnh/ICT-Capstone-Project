import React from 'react'
import image from '../Images/bkg2.webp';


const Home = () => {
    return (
        <div className="home-container">
          <div className="centered-content">
            <h2 style={{ position: 'relative', zIndex: 1,color:'white', fontWeight:'bold', fontFamily:'helvetica', fontSize: '600%' ,top:'0%' }}>Medical Sonography<br/> Logbook</h2>
            <img
              src={image}
              alt=""
              className="center-image"
              style={{ position: 'absolute', top: '65.6%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '70%', height: 'auto', zIndex: 0 }}
            />
          </div>
        </div>
      );
}

export default Home
