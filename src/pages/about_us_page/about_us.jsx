import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";


function AboutUs() {
 
  const [informationalData, setInformationData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => fetchInformationalData(), []);

  function fetchInformationalData() {

    const apiUrl="https://dotarbitrage.24livehost.com/api/v1/getAllAbout";
  
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: apiUrl,
      headers: {
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdhZDRhNTQ1N2I5NTNiNDFiY2U4YyIsImlhdCI6MTY4OTA2NzgxNCwiZXhwIjoxNjg5MTU0MjE0fQ.7NSTJllrgbqFUEbBKKuN_MxJHdU5E-ZP9OeZL-r-l28",
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          setInformationData(response.data.about);
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
                <h1>About Us</h1>
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

export default AboutUs;
