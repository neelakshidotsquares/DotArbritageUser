import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import CircularIndeterminate from "../progress_indicators/circular_progress";


function Banner() {

  const [bannerData,  setBannerData]=useState([]);

  useEffect(()=>fetchBannerData(),[]);
  
  function fetchBannerData(){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://dotarbitrage.24livehost.com/api/v1/getAllbanner',
      headers: {
        Cookie:
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTdhZDRhNTQ1N2I5NTNiNDFiY2U4YyIsImlhdCI6MTY4OTA2NzgxNCwiZXhwIjoxNjg5MTU0MjE0fQ.7NSTJllrgbqFUEbBKKuN_MxJHdU5E-ZP9OeZL-r-l28",
      },
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status===200){
        console.log(JSON.stringify(response.data.banner));
        let newBannerData=response.data.banner;
        setBannerData(newBannerData);  
      }else{
        toast("Something went wrong Error:"+response.status);
      }
    })
    .catch((error) => {
      toast("Something went wrong Error:"+error.toString());
      console.log(error);
    });
  }
   
 
   return (  
   <section className="hero">
   <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
   <div className="carousel-inner">

   {
    bannerData.map((item,index)=>{
      return (<div className="carousel-item active content" key={index}>
        <img src={'https://dotarbitrage.24livehost.com/image/'+item.image} className="d-block w-100" alt="..."/>
        <h1>{item.name}</h1>
    </div>);
    })
   }
   
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
   </section>
  );
}
export default Banner;