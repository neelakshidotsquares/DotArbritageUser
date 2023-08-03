
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ChangePassword from './pages/change_password_page/change_password';
import ForgotPassword from './pages/forgot_password_page/forgot_password';
import Home from './pages/home_page/home';
import Login from './pages/login_page/login';
import Notifications from './pages/notifications_page/notifications';
import Registration from './pages/registration_page/registration';
import Trading from './pages/trading_page/trading';
import Verification from './pages/verification_page/verification';
import AboutUs from './pages/about_us_page/about_us';
import PrivacyPolicy from './pages/privacy_policy_page/privacy_policy';
import TermsAndConditions from './pages/terms_and_conditions_page/terms_and_conditions';
import Profile from './pages/profile_page/profile';
import Transactions from './pages/transaction_page/transactions';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ChangePassword" element={<ChangePassword/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
          <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Notifications" element={<Notifications/>}/>
          <Route path="/Registration" element={<Registration/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Trading" element={<Trading/>}/>
          <Route path="/Transactions" element={<Transactions/>}/>
          <Route path="/Verification" element={<Verification/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
