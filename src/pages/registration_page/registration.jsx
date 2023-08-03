import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";

function Registration() {
  const navigation = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const [file, setFile] = useState(null);
  const [isAgreeToTermsAndConditions, setIsAgreeToTermsAndConditions] =
    useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const [registerLoading, setRegisterLoading] = useState(false);

  function handleRegisterDataChange(event) {
    const { name, value } = event.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();

    console.log(registerData);

    if (registerData.firstName.length < 2) {
      toast.warning("Please enter a valid full name!", {
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
    } else if (registerData.email.length < 8) {
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
    } else if (registerData.password.length < 8) {
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
      return;
    } else if (!isAgreeToTermsAndConditions) {
      toast.warning("Please agree to the terms and conditions", {
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
    } else if (registerData.password !== registerData.confirmPassword) {
      toast.warning("Confirm password does not match with password", {
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
    } else if (!file) {
      toast.warning("please select image", {
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
    let data = new FormData();
    const firstName = registerData.firstName.split(" ")[0];
    const lastName = registerData.firstName.substring(firstName.length).trim();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", registerData.email);
    data.append("password", registerData.password);
    data.append("image", file);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/register",
      headers: {
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdhZDRhNTQ1N2I5NTNiNDFiY2U4YyIsImlhdCI6MTY4OTA2NzgxNCwiZXhwIjoxNjg5MTU0MjE0fQ.7NSTJllrgbqFUEbBKKuN_MxJHdU5E-ZP9OeZL-r-l28",
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    setRegisterLoading(true);
    axios
      .request(config)
      .then((response) => {
        const registerResponse = response.status;
        if (registerResponse === 200) {
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          toast.success("Registered Successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setFile(null);
          setRegisterLoading(false);
          navigation("/Verification");
        } else {
          toast.error("Something went wrong, Error Code " + registerResponse, {
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
        setRegisterLoading(false);
        console.log(JSON.stringify(response.data));
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
        setRegisterLoading(false);
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <section className="login-page section register py-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="  pb-3">
              <a className="logo justify-content-center  w-auto" href="/">
                <img src="assets/img/arbitrage.svg" alt="" />
              </a>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-8">
              <div className="card mb-3 ">
                <div className="card-body ">
                  <div className="">
                    <h5 className="card-title text-center pb-0 fs-4">
                      User Register
                    </h5>
                  </div>
                  <form
                    onSubmit={handleRegisterSubmit}
                    className="row g-2 needs-validation account-login justify-content-center"
                  >
                    <div className="col-md-12">
                      <label htmlFor="yourUsername" className="form-label">
                        Name
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          id="yourUsername"
                          placeholder="Name"
                          onChange={handleRegisterDataChange}
                          value={registerData.firstName}
                          required
                          minLength={2}
                          maxLength={50}
                        />
                        <div className="invalid-feedback">
                          Please enter your Name.
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 ">
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
                          onChange={handleRegisterDataChange}
                          value={registerData.email}
                          required
                          minLength={8}
                          maxLength={50}
                        />
                        <div className="invalid-feedback">
                          Please enter your Email ID.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 ">
                      <label htmlFor="yourPassword" className="form-label">
                        Password
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text "
                          id="inputGroupPrepend"
                        >
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          onChange={handleRegisterDataChange}
                          value={registerData.password}
                          required
                          minLength={8}
                          maxLength={15}
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
                    <div className="col-md-12 ">
                      <label htmlFor="yourPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="input-group has-validation">
                        <span
                          className="input-group-text"
                          id="inputGroupPrepend"
                        >
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          onChange={handleRegisterDataChange}
                          value={registerData.confirmPassword}
                          required
                          minLength={8}
                          maxLength={15}
                        />
                        <span
                          className="input-group-text slash"
                          id="inputGroupPrepend"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <FontAwesomeIcon icon="fa-solid fa-eye" />
                          ) : (
                            <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                          )}
                        </span>
                        <div className="invalid-feedback">
                          Please enter your Confirm Password.
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
                              value={isAgreeToTermsAndConditions}
                              onChange={(e) => {
                                setIsAgreeToTermsAndConditions(
                                  e.target.checked
                                );
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="acceptTerms"
                            >
                              I accept the Terms & conditions.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 login ">
                      <button className="btn  w-100 " type="submit">
                        {!registerLoading ? "Register" : <CircularIndeterminate />}
                      </button>
                    </div>
                    <div className="col-12 text-center create-account">
                      <p className="small mb-0">
                        Already have an account? <Link to="/Login">Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div
              className="col-xl-4 col-lg-5 col-md-8"
              style={{ position: "relative", zIndex: "123" }}
            >
              <div className="upload-box">
                <div className="col-md-12 ">
                  <label htmlFor="yourPassword" className="form-label">
                    Upload Image
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      <i className="fa-regular fa-image"></i>
                    </span>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please upload your image.
                    </div>
                  </div>
                </div>
                {file && <img src={URL.createObjectURL(file)} alt="Preview" />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Registration;
