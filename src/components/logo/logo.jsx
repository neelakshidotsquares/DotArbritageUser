import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
  
  const navigation = useNavigate();

  function navigateToHome(){
     navigation('/');
  }

  return (
    <div className="logo">
    <img
        onClick={navigateToHome}
        src="assets/img/dotbot-logo.svg"
        alt="logo"
        className="img-fluid"
    />
    </div>
  );
}

export default Logo;

