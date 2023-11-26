import React, { useState } from 'react';
import '../css/LoginSignUp.css';
import user_icon from '../content/user.png';
import password_icon from '../content/password.png';
import { useNavigate } from 'react-router-dom';
import HomePageNav from './HomePageNav';
import Navbar from './Navbar';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email_address, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [usertype, setUsertype] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone] = useState('');
  const [signup, setSignup] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsertypeChange = (e) => {
    setUsertype(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
const handleUserNameChange=(e)=>{
  setUserName(e.target.value);
}

  const handleButtonClick = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/register', {username, password, usertype, name, phone_number, address, email_address})
    .then(res => {
      console.log('Response status:', res.status);
      console.log('Response data:', res.data);
  

      if (res.data === 'Error') {
        console.error('Login failed. Server returned an error:', res.data);
        
      } else {
        // Process the successful response data
        console.log('Login successful!');
       
        navigate('/Homepage');
      }
    })
  };

  const handleButtonLogin = () => {
    navigate('/login');
  };

  const [action, setAction] = useState('Signup');
  return (
    <>
      {signup ? <Navbar /> : <HomePageNav />}
      <div className="login_container">
        <div className="header_Login">
          <div className="text">{action}</div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
          </div>
        </div>
       
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={password_icon} alt="" />
            <input type="text" placeholder="UserType" value={usertype} onChange={handleUsertypeChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={user_icon} alt="" />
            <input type="text" placeholder="UserName" value={username} onChange={handleUserNameChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={password_icon} alt="" />
            <input type="text" placeholder="Address" value={address} onChange={handleAddressChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={password_icon} alt="" />
            <input type="text" placeholder="Phone Number" value={phone_number} onChange={handlePhoneChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img class="logo-container" src={password_icon} alt="" />
            <input type="text" placeholder="Email" value={email_address} onChange={handleEmailChange} />
          </div>
        </div>
        {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Forgot Password?<span>Click Here!</span></div>}

        <div className="submit-container">
          <div className={action === 'Signup' ? 'submit' : 'submit gray'} onClick={handleButtonClick}>
            Sign Up
          </div>
          <div className={action === 'Login' ? 'submit' : 'submit gray'} onClick={handleButtonLogin}>
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;