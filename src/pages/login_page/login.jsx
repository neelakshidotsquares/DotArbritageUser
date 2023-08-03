import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";

function Login() {

  const navigation = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const loginData_=localStorage.getItem('loginData');
    if(loginData_!==null){
      setLoginData(loginData_);
    }
  },[]);

  function handleLoginDataChange(event) {
    const { name, value } = event.target;
    setLoginData((preLoginData) => ({
      ...preLoginData,
      [name]: value,
    }));
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLoginSubmit(event) {

    event.preventDefault();
    console.log(loginData);

    if (loginData.email.length < 8) {
      toast.warning("Please enter a valid email", {
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
    } else if (loginData.password.length < 8) {
      toast.warning("Please enter a valid password", {
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

    let data = JSON.stringify({
      email: loginData.email,
      password: loginData.password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/login",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdhZDRhNTQ1N2I5NTNiNDFiY2U4YyIsImlhdCI6MTY4OTA2NzgxNCwiZXhwIjoxNjg5MTU0MjE0fQ.7NSTJllrgbqFUEbBKKuN_MxJHdU5E-ZP9OeZL-r-l28",
      },
      data: data,
    };

    setIsLoading(true);
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("loginToken", response.data.token);
          if(rememberMe){
            localStorage.setItem('loginData',loginData)
          }
          toast.success("Successfully loged in!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setLoginData({
            email: "",
            password: "",
          });
          setRememberMe(false);
          navigation("/");
        } else {
          console.log("Something went wrong, Error Code " + response.status);
          toast.error("Something went wrong, Error Code " + response.status, {
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
        console.log(JSON.stringify(response));
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.toString();
        console.log(errorMessage);
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
                      User Login
                    </h5>
                  </div>
                  <form
                    onSubmit={handleLoginSubmit}
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
                          onChange={handleLoginDataChange}
                          value={loginData.email}
                          required
                          minLength={8}
                          maxLength={320}
                        />
                        <div className="invalid-feedback">
                          Please enter your Email ID.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">
                        Password
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder=" Password."
                          onChange={handleLoginDataChange}
                          value={loginData.password}
                          required
                          minLength={8}
                          maxLength={320}
                        />
                        <span
                          className="input-group-text slash"
                          id="inputGroupPrepend"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon="fa-solid fa-eye" />
                          ) : (
                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                          )}
                        </span>
                        <div className="invalid-feedback">
                          Please enter your Password.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="remMe">
                        <div className="form-check"></div>
                        <div className="fgtr">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              name="terms"
                              type="checkbox"
                              id="acceptTerms"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acceptTerms"
                            >
                              Remember Me
                            </label>
                          </div>
                          <div className="forgot-password-ftr">
                            <p className="small mb-0">
                              <Link to="/ForgotPassword">Forgot password?</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 login">
                      <button className="btn  w-100" type="submit">
                        {!isLoading ? "Login" : <CircularIndeterminate />}
                        {/* Login */}
                      </button>
                    </div>
                    <div className="col-12 text-center create-account"></div>
                    <div className="col-12 text-center create-account">
                      <p className="small mb-0">
                        Don't have an account ?{" "}
                        <Link to="/Registration">Register Now</Link>
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

export default Login;
