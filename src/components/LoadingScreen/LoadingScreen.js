import React from 'react';
import './LoadingScreen.css';
import logo from "../../images/logo.png"; // Replace with your own logo image file

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}

export default LoadingScreen;
