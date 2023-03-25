import React from 'react';
import './LoadingScreen.css';
import logo from "../../images/logo.png"; // Replace with your own logo image file

function LoadingScreen() {
    React.useEffect(() => {
        const logo = document.querySelector('.logo');
        setTimeout(() => {
          logo.style.opacity = '1';
          logo.style.filter = 'blur(0)';
          setTimeout(() => {
            logo.style.opacity = '0';
            logo.style.filter = 'blur(10px)';
            setTimeout(() => {
              document.querySelector('.loading-screen').style.opacity = '0';
              setTimeout(() => {
                window.location.href = '/app';
              }, 1000); // Change 1000 to the desired delay in milliseconds
            }, 1000); // Change 1000 to the desired delay in milliseconds
          }, 1000); // Change 1000 to the desired delay in milliseconds
        }, 1000); // Change 1000 to the desired delay in milliseconds
      }, []);
  
    return (
      <div className="loading-screen">
        <img src={logo} alt="logo" className="logo" />
      </div>
    );
  }

export default LoadingScreen;
