import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";
import { useNavigate, useNavigation } from "react-router-dom";


function Notifications() {
 
  const [informationalData, setInformationData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const navigation = useNavigate();
  useEffect(() => fetchInformationalData(), []);

  function fetchInformationalData() {

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

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          setInformationData(response.data.notifications);
          setIsDataLoading(false);
        } else {
          toast("Something went wrong Error:" + response.status);
          setIsDataLoading(false);
          console.log(response.status);
        }
      })
      .catch((error) => {
        toast("Something went wrong Error:" + error.toString());
        setIsDataLoading(false);
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <Header />
      <section className="about-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-page-heading">
                <h1>Notifications</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-page-acco">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-page-acco-tt">
                {
                isDataLoading?
                <CircularIndeterminate />
                :informationalData.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="heading">{item.name}</div>
                      <div className="details">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}


export default Notifications;
