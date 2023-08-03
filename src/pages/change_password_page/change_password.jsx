import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";


function ChangePassword() {
  const navigation = useNavigate();
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function handleChangePasswordData(event) {
    const { name, value } = event.target;
    setChangePassword((preChangePasswordData) => ({
      ...preChangePasswordData,
      [name]: value,
    }));
  }

  function handleChangePasswordSubmit(event) {
    event.preventDefault();
    setChangePasswordLoading(true);

    if (changePassword.oldPassword.length < 8) {
      toast.error("Please enter a valid oldpassword!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setChangePasswordLoading(false);
      return;
    } else if (changePassword.oldPassword.length < 8) {
      toast.error("Please enter a valid newpassword!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setChangePasswordLoading(false);
      return;
    }

    const token = localStorage.getItem("loginToken");
    if (!token) {
      navigation("/Login");
      return;
    }

    let data = JSON.stringify({
      oldPassword: changePassword.oldPassword,
      newPassword: changePassword.newPassword,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/changePassword",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Successfully Change Password!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setChangePassword({
            oldPassword: " ",
            newPassword: "",
          });
          navigation("/");
        } else {
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
        console.log(JSON.stringify(response.data));
        setChangePasswordLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong, Error Code " + error.toString(), {
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
        setChangePasswordLoading(false);
      });
  }

  return (
    <React.Fragment>
      <div>
        <Header />
        <section className="user-profile">
          <div className="container ">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="">
                  <h5 className="card-title text-center pb-0 ">
                    Change Password
                  </h5>
                </div>
                <form
                  onSubmit={handleChangePasswordSubmit}
                  className="row g-2 needs-validation account-login"
                >
                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">
                      Old Password
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="oldPassword"
                        className="form-control"
                        id="password"
                        placeholder=" Old Password."
                        onChange={handleChangePasswordData}
                        value={changePassword.oldPassword}
                        required
                        minLength={8}
                        maxLength={50}
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
                    <label htmlFor="yourPassword" className="form-label">
                      New Password
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="newPassword"
                        className="form-control"
                        id="password"
                        placeholder="New Password."
                        onChange={handleChangePasswordData}
                        value={changePassword.newPassword}
                        required
                        minLength={8}
                        maxLength={50}
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
                        Please enter your Password.
                      </div>
                    </div>
                  </div>

                  <div className="col-12 login">
                    <button className="btn btn-primary w-100" type="submit">
                      {!changePasswordLoading ? (
                        "Change Password"
                      ) : (
                        <CircularIndeterminate />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default ChangePassword;
