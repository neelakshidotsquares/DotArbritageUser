import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularIndeterminate from "../progress_indicators/circular_progress";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isFormLoading, setIsFormLoading] = useState(false);

  function handleFormDataChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    console.log(formData);

    let data = JSON.stringify({
      fullName: formData.fullName,
      message: formData.message,
      email: formData.email,
      subject: formData.subject,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/contactCreate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    setIsFormLoading(true);

    axios
      .request(config)
      .then((response) => {
        const responseStatus = response.status;
        if (responseStatus === 200) {
          toast.success("Thank you. Your response is submitted successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
            console.log("Something went wrong, Error Code " + responseStatus)
        }
        console.log(JSON.stringify(response.data));
        setIsFormLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.toString();
        console.log(errorMessage);
        setIsFormLoading(false);
      });
  }

  return (
    <section className="contact-us">
      <h2>Contact Us</h2>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="contact-from">
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="first-name">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Name"
                        className="form-control"
                        aria-describedby="passwordHelpBlock"
                        value={formData.fullName}
                        required
                        minLength={2}
                        maxLength={320}
                        onChange={handleFormDataChange}
                      />
                      <div id="passwordHelpBlock" className="form-text"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="first-name">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        required
                        minLength={8}
                        maxLength={320}
                        aria-describedby="passwordHelpBlock"
                        value={formData.email}
                        onChange={handleFormDataChange}
                      />
                      <div id="passwordHelpBlock" className="form-text"></div>
                    </div>
                  </div>
                </div>

                <div className="first-name mt-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="form-control"
                    required
                    minLength={2}
                    maxLength={320}
                    aria-describedby="passwordHelpBlock"
                    value={formData.subject}
                    onChange={handleFormDataChange}
                  />
                  <div id="passwordHelpBlock" className="form-text"></div>
                </div>
                <div className="mt-3">
                  <textarea
                    className="form-control"
                    type="text"
                    name="message"
                    placeholder="Drop Message Here"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleFormDataChange}
                  ></textarea>
                </div>
                <button type="submit">
                  {" "}
                  {!isFormLoading ? "Send Message" : <CircularIndeterminate />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
