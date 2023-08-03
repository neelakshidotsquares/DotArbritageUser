import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

import contractAbi from '../../contract/dotarbritage.json'; // Replace with the path to your contract ABI
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, CircularProgress } from "@mui/material";


const Trading = () => {

  const contractAddress = '0xc93cb21703a426165D5B93850F96cBA275272468'; // Replace with your contract address on the BSC testnet
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC testnet endpoint
  const contractInstance = new web3.eth.Contract(contractAbi.abi, contractAddress);
  const navigation = useNavigate();
  const [tokens, setTokens] = useState([]);
  const [selectedToken1, setSelectedToken1] = useState({});
  const [selectedToken2, setSelectedToken2] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUserTrading, setIsUserTrading] = useState(false);
  const [isAmount, setIsAmount] = useState();
  const [tradeFee, setTradeFee] = useState('0');
  const [userData, setUserData] = useState({});

  async function isTrading(traderAddress_) {
    try {
    
      const result = await contractInstance.methods.getTradeStatus(traderAddress_).call();
      const result2 = await contractInstance.methods.getTradeFee().call();
      console.log('Read Result:', result[0]);
      console.log("result 2",result2);
      setIsUserTrading(result[0]);
      setTradeFee(result2);
      setIsLoading(false);

    } catch (error) {
     console.log(error); 
     console.log(error)
    }
  }

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
         
          isTrading(response.data.user.publicKey);
       
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
  
  async function enrollInTrade(privateKey, 
     amount0_,
     amount1_,
     token0_,
     token1_) {
    try {
     
      setIsLoading(true);

      debugger
      // Check user's balance
      const balanceWei = await web3.eth.getBalance(userData.publicKey);
      const balanceBNB = web3.utils.fromWei(balanceWei, 'ether');
      console.log('User balance:', balanceBNB, 'BNB');

      const requiredAmount = tradeFee;

      const account = web3.eth.accounts.privateKeyToAccount(privateKey);


      if(requiredAmount>balanceWei){
        toast.error(("Insufficient Balance"), {
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
      else
      {

         // Assuming enrollTrade function takes four string arguments
        const arg1 = amount0_;
        const arg2 = amount1_;
        const arg3 = token0_;
        const arg4 = token1_;

        const data = contractInstance.methods.enrollTrade(arg1, arg2, arg3, arg4).encodeABI();

        const tx = {
          from: account.address,
          to: contractAddress,
          data: data,
          value: web3.utils.toWei('0.03', 'ether'), // Sending 0.03 ether, you can adjust this value
          gas: 3000000, // Adjust the gas value to a reasonable amount for your transaction
          gasPrice: web3.utils.toWei('10', 'gwei'), // Adjust the gas price to a reasonable value in gwei
        };
        
    
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction Hash:', result.transactionHash);

        setIsUserTrading(true);
        toast.success("Your Trade Registered Successfully", {
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
      setIsLoading(false);
   
    } catch (error) {
      console.error('Error writing to contract:', error);
      toast.error(error.toString(), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  }

  function handleChangeToken1(e) {
    setSelectedToken1(e.target.value);
  }
  function handleChangeToken2(e) {
    setSelectedToken2(e.target.value);
  }
  function handleChangeAmount(e) {
    setIsAmount(e.target.value);
  }

  useEffect(() => fetchCurrencyData(), []);

  function fetchCurrencyData() {
    const token = localStorage.getItem("loginToken");
    console.log(token);

    if (!token) {
      navigation("/Login");
      return;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://dotarbitrage.24livehost.com/api/v1/getAllCurrency",
      headers: {
        Authorization: `Bearer${token} `,
        Cookie: `token=${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setTokens(response.data.currency);
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

      fetchUserData();
  }

  return (
    <>
      <Header />
      {
        isLoading?<CircularProgress/>:
        isUserTrading?
        <Button>Your Trade is being Pooled.</Button>
        :
        <section className="user-profile">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 ">
              <div className="trading-box">
                <div className=" mb-2">
                  <label>Token-1</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChangeToken1}
                    value={selectedToken1.currencyAddress}
                    required
                  >
                    <option value="default">Select Token</option>
                    {tokens.map((item, index) => {
                      return (
                        <option key={index} value={item.currencyAddress}>
                          {item.currencyName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span>
                  <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
                </span>
                <div className="mt-2 mb-2">
                  <label>Token-2</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleChangeToken2}
                    value={selectedToken2.currencyAddress}
                    required
                  >
                    <option value="default">Select Token</option>
                    {tokens.map((item, index) => {
                      return (
                        <option key={index} value={item.currencyAddress}>
                          {item.currencyName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="image-logo">
                  <div className="ygt">
                    <img
                      src="/assets/img/logo.png"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                  <div className="ygt">
                    <img
                      src="/assets/img/logo.png"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                    />
                  </div>
                </div>
                <div className="buy-sell">
                  <button>Buy</button>
                  <button>Sell</button>
                </div>
                <div className="mt-2 mb-2">
                  <label>Enter Amount</label>
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={handleChangeAmount}
                    value={isAmount}
                    required
                  />
                </div>
                <div className="btn-trd">
                  <button onClick={()=>{
                      
                        const amount=isAmount;
                        const Token1=selectedToken1;
                        const Token2=selectedToken2;
                        console.log(Token1);
                        console.log(Token2);
                      
                        if(amount<0){
                          toast.error("Invalid Amount", {
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
                        else if(Token1===Token2){
                          toast.error("Buying and selling token can not be equal", {
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
                        else{
                          enrollInTrade(userData.privateKey,amount,"0",selectedToken1,selectedToken2)
                        }
                  }} type="button">Start Trading</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      }
      <Footer />
    </>
  );
};

export default Trading;
