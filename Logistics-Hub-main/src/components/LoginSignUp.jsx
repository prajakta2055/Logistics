import React, { useState } from 'react';
import '../css/LoginSignUp.css';
import email_icon from '../content/user.png';
import password_icon from '../content/password.png';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HomePageNav from './HomePageNav';
import axios from 'axios';
import { useUser } from './userContext';

const LoginSignUp = () => {
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUserType] = useState('');
  const [log, setLogin] = useState(false);
  const [action, setAction] = useState('Login');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/user', { username, password, usertype });

      console.log('Response status:', res.status);
      console.log('Response data:', res.data);

      if (res.data === 'Error') {
        console.error('Login failed. Server returned an error:', res.data);
      } else {
        // Process the successful response data
        console.log('Login successful!');
        login(username, usertype);
        if(usertype === 'admin')
          navigate('/ManagerHome');
        else{
          navigate('/Shipments');
        } 
      }
    } catch (error) {
      alert("Invalid Login Credentials...!")
      console.error('An error occurred:', error.message);
    }
  };

  const handleButtonSignup = () => {
    setAction('Sign Up');
    navigate('/Signup');
  };

  return (
    <>
      
      <div className="login_container">
      <button
    onClick={() => navigate("/")}
    style={{
      padding: '10px',
      backgroundColor: '#3498db',  // Change the background color as needed
      color: '#fff',              // Change the text color as needed
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginLeft: '8%',
      marginRight: '8%',
    }}
  >
    Back to Home
  </button>
        <div className="header_Login">
          <div className="text">{action}</div>
        </div>
        <div className="inputs">
          <div className="input">
            <img className="logo-container" src={email_icon} alt="" />
            <input type="email" placeholder="Username" value={username} onChange={handleUsernameChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img className="logo-container" src={password_icon} alt="" />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img className="logo-container" src={password_icon} alt="" />
            <select value={usertype} onChange={handleTypeChange}>
              <option className="opt" value="cust">
                Select usertype
              </option>
              <option className="opt" value="customer">
                Customer
              </option>
              <option className="opt" value="admin">
                Admin
              </option>
            </select>
          </div>
        </div>

        {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Forgot Password?<span>Click Here!</span></div>}

        <div className="submit-container">
          <div className={action === 'Log' ? 'submit gray' : 'submit'} onClick={handleButtonSignup}>
            Sign Up
          </div>
          <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={handleButtonClick}>
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
