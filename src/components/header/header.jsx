import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../logo/logo";
import { Badge } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {

  const navigation = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [notification, setNotification]=useState([]);
  const [count, setCount]=useState(0);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loginToken");
    if (loggedInUser != null) {
      setAuthenticated(true);
      fetchNotificationData();
    } else {
      setAuthenticated(false);
    }
  }, []);

  function goToLogin() {
    navigation("/Login");
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("loginToken");
    navigation("/");
  }

  function fetchNotificationData(){
     
    const token = localStorage.getItem("loginToken");
    if (!token) {
      navigation("/Login");
      return;
    }
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://dotarbitrage.24livehost.com/api/v1/getAllNotification',
      headers: { 
        'Authorization': `Bearer ${token}`, 
        'Cookie': `token=${token}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status===200){
        setNotification(response.data.notifications);
        setCount(response.data.notifications.length)    
      }else {
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
      console.log(error);
    });

  }

  return (
    <header className="header">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
         <Logo/>
        </div>
        <div className="col-md-6">
          <div className="menu">
            <ul>
              {authenticated ? 
              (
                <div className="navbar navbar-expand-lg navbar-dark">
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link "
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <Badge color="success" overlap="circular" badgeContent=" " variant="dot">
                          <FontAwesomeIcon icon="fa-solid fa-user"/>
                          </Badge>
                       
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to="/Profile">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/Trading">
                              Trading{" "}
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/ChangePassword"
                            >
                              Change Password
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/Transactions"
                            >
                              Transactions 
                            </Link>
                          </li>
                          <li>
                            <div
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              Logout
                            </div>
                          </li>
                        </ul>
                      </li>
                      {notification && (
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link "
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <Badge badgeContent={count} color="primary">
                            <FontAwesomeIcon icon="fa-regular fa-bell"/>
                            </Badge>
                          </a>
                          <ul className="dropdown-menu notification">
                            <h2>Notification</h2>
                              {notification.slice(0,5).map((item, index) => (
                                <li key={index}>
                                  <h6>{item.name}</h6>
                                  <p>{item.description}</p>
                                </li>
                              ))}

                                <li key={-1}>
                                  <Link to={"/Notifications"} >
                                  <h6>{"Show More"} </h6>
                                  </Link>
                                </li>
                            
                          </ul>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )
               : (
                  <li>
                    <button onClick={goToLogin}>Get Started</button>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  );
}

export default Header;
