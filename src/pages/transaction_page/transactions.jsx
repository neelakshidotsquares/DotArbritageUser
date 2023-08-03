import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import CircularIndeterminate from "../../components/progress_indicators/circular_progress";
import Web3 from 'web3';
import contractAbi from '../../contract/dotarbritage.json'; 
import { useNavigate } from "react-router-dom";

function Transactions() {
 
  const contractAddress = '0xc93cb21703a426165D5B93850F96cBA275272468'; // Replace with your contract address on the BSC testnet
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC testnet endpoint
  const contractInstance = new web3.eth.Contract(contractAbi.abi, contractAddress);

  const [informationalData, setInformationData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigation = useNavigate();

  useEffect(() => fetchUserData(), []);

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

    setIsDataLoading(true);

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
          getTransactions(response.data.user.publicKey);

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
        setIsDataLoading(false);
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
        setIsDataLoading(false);
        console.log(error);
      });
  }
  

  async function getTransactions(traderAddress_) {
    try {
      debugger;
      const result = await contractInstance.methods.getTradeHistory(traderAddress_).call();
      
      console.log('Read Result:', result);
      setInformationData(result);
      setIsDataLoading(false);
    } 
    catch (error) {
     setIsDataLoading(false);
     console.log(error); 
     console.log(error)
    }
  }


 

  return (
    <React.Fragment>
      <Header />
      <section className="about-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="about-page-heading">
                <h1>Transactions</h1>
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
                :informationalData.length>0?informationalData.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="heading">{"Token 1:"+item[4]+" Token 2:"+item[5]}</div>
                      <div className="details">
                        <p>{"Amount :"+item[2]+"\nStarted At:"+item[6]+"\nEnded At:"+item[7]}</p>
                      </div>
                    </div>
                  );
                }):
                 <div key={0}>
                <div className="heading">{"No Transaction"}</div>
                <div className="details">
                  <p>{"No Transactions history found"}</p>
                </div>
              </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default Transactions;
