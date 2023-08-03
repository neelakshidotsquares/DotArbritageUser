import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();
  const navigateToInformationalPage = (id) => {
    console.log(id);
    if (id === 0) {
      navigate("/AboutUs");
    } else if (id === 1) {
      navigate("/TermsAndConditions");
    } else {
      navigate("/PrivacyPolicy");
    }
  };
  return (
    <section className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="copyright">
              <p>Copyrights © 2023 <span onClick={()=>{
                window.open(
                    "https://dotsquares.com",
                    "_blank"
                  )
              }} >Dotsquares.</span> All rights reserved.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="copyright">
              <ul>
                <li onClick={() => navigateToInformationalPage(0)}>
                  {" "}
                  About us
                </li>
                <li onClick={() => navigateToInformationalPage(1)}>
                  {" "}
                  Terms and conditions
                </li>
                <li onClick={() => navigateToInformationalPage(2)}>
                  {" "}
                  Privacy policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

