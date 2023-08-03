import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";

function ForgotPassword() {
  const navigation = useNavigate();

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleForgotPasswordDataChange(event) {
    const { name, value } = event.target;
    setForgotPasswordData((preForgotPasswordData) => ({
      ...preForgotPasswordData,
      [name]: value,
    }));
  }

  function handleForgotPasswordSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    console.log(forgotPasswordData);

    let data = JSON.stringify({
      email: forgotPasswordData.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/password/forget",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjdkMjg3YTJiZGY0YjZhMjc4ZTlmYSIsImlhdCI6MTY4OTc2ODU4NywiZXhwIjoxNjg5ODU0OTg3fQ.ManiiKYPhaDSyQggimhIKMTlAnPoE4RrcyNXBIsTR7k",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const forgotPasswordResponse = response.status;
        if (forgotPasswordResponse === 200) {
          toast.success("Forgot Password Link Sent Successfully ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setForgotPasswordData({
            email: "",
          });
          navigation('/Login');
        } else {
          toast.error(
            "Something went wrong, Error Code " + forgotPasswordResponse,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
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
        setIsLoading(false);
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
                      Forgot Password
                    </h5>
                  </div>
                  <p className="text-center small">
                    {" "}
                    You forgot your password? Here you can easily retrieve a new
                    password.
                  </p>
                  <form
                    onSubmit={handleForgotPasswordSubmit}
                    className="row g-2 needs-validation account-login"
                  >
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        Email
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourUsername"
                          placeholder="Email ID."
                          onChange={handleForgotPasswordDataChange}
                          value={forgotPasswordData.email}
                          required
                          minLength={8}
                          maxLength={320}
                        />
                        <div className="invalid-feedback">
                          Please enter your Email ID.
                        </div>
                      </div>
                    </div>

                    <div className="col-12 login">
                      <button
                        className="btn btn-primary w-100 mt-2"
                        type="submit"
                      >
                        {!isLoading ? "Request Forgot Password" : <CircularIndeterminate />}
                       
                      </button>
                    </div>
                    <div className="col-12 text-center create-account">
                      <p className="small mb-0">
                        <Link to="/Login">Login</Link>
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

export default ForgotPassword;

