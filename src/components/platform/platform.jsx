import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Platform() {
  const [platformData, setPlatFormData] = useState([]);

  useEffect(() => {
    fetchPlatformData();
  }, []);

  function fetchPlatformData() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/getAllplatform",
      headers: {
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdhZDRhNTQ1N2I5NTNiNDFiY2U4YyIsImlhdCI6MTY4OTA2NzgxNCwiZXhwIjoxNjg5MTU0MjE0fQ.7NSTJllrgbqFUEbBKKuN_MxJHdU5E-ZP9OeZL-r-l28",
      },
    };

    try {
      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.data));
            const newPlatFormData = response.data.platform;
            setPlatFormData(newPlatFormData);
            console.log(newPlatFormData);
          } else {
            toast("Something went wrong Error: " + response.status);
          }
        })
        .catch((error) => {
          toast("Something went wrong Error: " + error.toString());
          console.log(error);
        });
    } catch (error) {
      toast("Something went wrong Error: " + error.toString());
      console.log(error);
    }
  }

  return (
    <section className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
            <div className="about-conent">
              <h6>Who We Are</h6>
              {platformData.map((data, index) => {
                return (
                  <div key={index}>
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                  </div>
                );
              })}
              <button
                onClick={() =>
                  window.open(
                    "https://dotcoin.thedotverse.com/BuyToken",
                    "_blank"
                  )
                }
              >
                Purchase Token
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-img">
              <img
                src="assets/img/about-img.png"
                alt="about-img"
                className="img-fluid"
              />
              <img
                src="assets/img/about-img.png"
                alt="about-img"
                className="sec-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Platform;
