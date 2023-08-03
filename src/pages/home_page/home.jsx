import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Banner from "../../components/banner/banner";
import Platform from "../../components/platform/platform";
import ContactUs from "../../components/contact_us/contact_us";

function Home() {
  return (
    <>
    <Header/>
    <Banner/>
    <Platform/>
    <ContactUs/>
    <Footer/>
    </>
  );
}

export default Home;
