import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";

function Verification() {
  const navigation = useNavigate();
  function goToLogin() {
    navigation("/Login");
  }
  const [otpData, setOtpData] = useState({
    opt: 0,
  });

  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResendLoading, setOtpResendLoading] = useState(false);

  function handleOtpDataChange(event) {
    const { name, value } = event.target;
    setOtpData((preOtpData) => ({
      ...preOtpData,
      [name]: value,
    }));
  }

  function handleOtpSubmit(event) {
    event.preventDefault();
  
      setOtpLoading(true);

      if (otpData.otp.length !== 6) {
        toast.warning("invalid OTP!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

    const otp = Math.floor(otpData.otp);
    let data = JSON.stringify({
      Otp: otp,
    });
    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/ConfirmOTP",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const otpResponse = response.status;
        if (otpResponse === 200) {
          console.log(response.data);
          toast.success("OTP Verified Successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setOtpData({
            otp: 0,
          });
          setOtpLoading(false);
          localStorage.clear();
          goToLogin();
        } else {
          toast.error("Something went wrong, Error Code " + otpResponse, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        console.log(JSON.stringify(response.data));
        setOtpLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.toString();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error);
        setOtpLoading(false);
      });
  }

  function handleResendOtp(event) {
    event.preventDefault();
  
    setOtpResendLoading(true);

    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/Resend",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const otpResponse = response.status;
        if (otpResponse === 200) {
          console.log(response.data);
          toast.success("Successfully Resend OTP!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

        } else {
          toast.error("Something went wrong, Error Code " + otpResponse, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        console.log(JSON.stringify(response.data));
        setOtpResendLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.toString();
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error);
        setOtpResendLoading(false);
      });
  }

  return (
    <React.Fragment>
      <section className="login-page section register py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-8 ">
              <div className="  pb-3">
                <a className="logo justify-content-center w-auto" href="/">
                  <img src="assets/img/arbitrage.svg" alt="" />
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="">
                    <h5 className="card-title text-center pb-0 fs-4">
                      OTP Verification{" "}
                    </h5>
                  </div>
                  <form
                    onSubmit={handleOtpSubmit}
                    className="row g-2 needs-validation account-login"
                  >
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        OTP code
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="otp"
                          className="form-control"
                          id="yourUsername"
                          onChange={handleOtpDataChange}
                          value={otpData.email}
                          required
                          placeholder="Enter OTP code"
                          maxlength="6"
                        />
                        <div className="invalid-feedback">
                          Please enter verify code.
                        </div>
                      </div>
                    </div>

                    <div className="col-12 login">
                      <button className="btn  w-100" type="submit">
                        {!otpLoading ? "Verify OTP" : <CircularIndeterminate />}
                      </button>
                    </div>
                    <div className="col-12 text-center create-account">
                      <p onClick={handleResendOtp} className="small mb-0">
                      {!otpResendLoading ? "Resend OTP" : <CircularIndeterminate />}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Verification;
