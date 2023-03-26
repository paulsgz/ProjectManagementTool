import React, { useEffect } from 'react';
import './LoadingScreen.css';
import logo from "../../images/logo.png";

function LoadingScreen() {
  useEffect(() => {
    const logo = document.querySelector('.logo');
    let timeout1, timeout2, timeout3, timeout4;

    timeout1 = setTimeout(() => {
      logo.style.opacity = '1';
      logo.style.filter = 'blur(0)';
      timeout2 = setTimeout(() => {
        logo.style.opacity = '0';
        logo.style.filter = 'blur(10px)';
        timeout3 = setTimeout(() => {
          document.querySelector('.loading-screen').style.opacity = '0';
          timeout4 = setTimeout(() => {
            window.location.href = '/';
          }, 1000); // Change 1000 to the desired delay in milliseconds
        }, 1000); // Change 1000 to the desired delay in milliseconds
      }, 1000); // Change 1000 to the desired delay in milliseconds
    }, 1000); // Change 1000 to the desired delay in milliseconds

    // Cleanup function
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);

  return (
    <div className="loading-screen">
      <img
        src={logo}
        alt="logo"
        className="logo"
      />
    </div>
  );
}

export default LoadingScreen;