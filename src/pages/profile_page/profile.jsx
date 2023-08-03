import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router";
import FormData from "form-data";
import { CircularProgress } from "@mui/material";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

const Profile = () => {
  const navigation = useNavigate();

  //User Data from Server
  const [userData, setUserData] = useState({});

  //Data Edited by user
  const [textEditable, setTextEditable] = useState({
    firstName: "",
    lastName: "",
  });

  //Is user uploading image
  const [isUplaoding, setIsUplaoding] = useState(false);

  //Is user editing first and last name
  const [isEditing, setIsEditing] = useState(false);

  function handleChangeUserData(event) {
    const value = event.target.value;

    const firstName = value.split(" ")[0];
    const lastName = value.substring(firstName.length).trim();

    setTextEditable(() => ({
      firstName: firstName,
      lastName: lastName,
    }));
  }

  function handleEditingDataSubmited(e) {
    e.preventDefault();
    if (textEditable.firstName.length < 2 || textEditable.lastName.length < 2) {
      toast.error("Please enter a valid name!", {
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

    const token = localStorage.getItem("loginToken");
    if (!token) {
      navigation("/Login");
      return;
    }

    const firstName = textEditable.firstName;
    const lastName = textEditable.lastName;

    const data = new FormData();
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    // data.append("image", file);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://dotarbitrage.24livehost.com/api/v1/updateProfile/:id`, // Replace :id with the actual user ID
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
      data: data,
    };
    setIsEditing(false);
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];

    if (file !== null) {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        navigation("/Login");
        return;
      }
      const data = new FormData();

      data.append("image", file);
      data.append("firstName", userData.firstName);
      data.append("lastName", userData.lastName);
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://dotarbitrage.24livehost.com/api/v1/updateProfile/:id`, // Replace :id with the actual user ID
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };

      setIsUplaoding(true);
      try {
        const response = await axios.request(config);
        if (response.status === 200) {
          console.log("Image uploaded");
        } else {
          console.log(response.status);
        }
        console.log(JSON.stringify(response));
        fetchUserData();
      } catch (error) {
        toast(error.toString());
        fetchUserData();
      }
    }
  }

  function toggleEditing() {
    setIsEditing((prevEditing) => !prevEditing);
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    const token = localStorage.getItem("loginToken");
    console.log(token);

    if (!token) {
      navigation("/Login");
      return;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/getUserById/:id",
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `token=${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
          setTextEditable({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
          });
          setIsEditing(false);
          setIsUplaoding(false);
        } else {
          toast.error("Something went wrong, Error Code ", {
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
      });
  }

  return (
    <div>
      <Header />
      <section className="user-profile">
        <div className="container ">
          <div className="row"></div>
          <div className="row">
            <div className="col-lg-4 mb-2">
              <div className="card ">
                <div className="card-body text-center upd-ci">
                  {isUplaoding ? (
                    <CircularProgress />
                  ) : (
                    <img
                      src={`https://dotarbitrage.24livehost.com/image/${userData.image}`}
                      alt="avatar"
                      className="rounded-circle img-fluid"
                    />
                  )}
                  <h5 className="my-3">
                    {userData.firstName} {userData.lastName}
                  </h5>
                  <div className="update-profile mb-2">
                    <label htmlFor="upload">
                      <input
                        type="file"
                        id="upload"
                        hidden
                        className=""
                        onChange={handleImageChange}
                      />
                      Upload Image
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="profile-list">
                <div className="card mb-4">
                  <div className="col-md-12">
                    <div className="edit-icon-btn">
                      <>
                        <button onClick={toggleEditing} className=" edit">
                          {isEditing ? (
                            <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
                          ) : (
                            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                          )}
                        </button>
                      </>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        {isEditing ? (
                          <div className="wallet-address-ty">
                            <p className="mb-0">Full Name</p>
                          </div>
                        ) : (
                          <div className="wallet-address">
                            <p className="mb-0">Full Name</p>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-9">
                        <div className="wallet-address">
                          {isEditing ? (
                            <>
                              <form onSubmit={handleEditingDataSubmited}>
                                <input
                                  className="form-control"
                                  onChange={handleChangeUserData}
                                  type="text"
                                  value={
                                    textEditable.firstName +
                                    " " +
                                    textEditable.lastName
                                  }
                                  name="firstName"
                                  placeholder="Enter Your FullName"
                                  required
                                />
                                <div className="save">
                                  <button className="btn " type="submit">
                                    save
                                  </button>
                                </div>
                              </form>
                            </>
                          ) : (
                            <p className=" mb-0">
                              {userData.firstName} {userData.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3">
                        <div className="wallet-address">
                          <p className="mb-0">Email</p>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="wallet-address">
                          <p className=" mb-0">{userData.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="wallet-address">
                          <p className="mb-0">Wallet Address</p>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="wallet-address">
                          <p className=" mb-0"></p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3">
                        <div className="wallet-address">
                          <p className="mb-0">Public Key</p>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="wallet-address">
                          <p className=" mb-0">{userData.publicKey}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="wallet-address">
                          <p className="mb-0">Private key</p>
                        </div>
                      </div>
                      <div className="col-sm-9">
                        <div className="wallet-address">
                          <p className=" mb-0">{userData.privateKey}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile-submit">
                    <button
                      onClick={() => {
                        navigation("/Transactions");
                      }}
                      type="button"
                      className=""
                    >
                      Transaction History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
