import React,{useState} from 'react'
import '../css/LoginSignUp.css'
import email_icon from '../content/mail.png'
import password_icon from '../content/password.png'
import Homepage from './Homepage'
import HomePageNav from './HomePageNav'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const LoginSignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, SetUsertype] = useState('');
  const [login, setLogin] = useState(false);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTypeChange = (e) => {
    SetUsertype(e.target.value);
  };
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/user', {username, password, usertype})
    .then(res => {
      console.log('Response status:', res.status);
      console.log('Response data:', res.data);
  

      if (res.data === 'Error') {
        console.error('Login failed. Server returned an error:', res.data);
        
      } else {
        // Process the successful response data
        console.log('Login successful!');
       
        navigate('/Shipments');
      }
    })
  }

  const handleButtonSignup = () => {
    navigate('/signup');
  }
  const[action,setAction]=useState("Login");
  return (
    <>
      {
        login ? 
        <Navbar/> 
        : 
        <HomePageNav/> 
      }
      <div className='login_container'>
          <div className='header_Login'>
              <div className='text'>{action}</div>
          </div>
          <div className='inputs'>
              <div className="input">
                  <img class="logo-container" src={email_icon} alt=""/>
                  <input type="email" placeholder='Email Id' value={username}
            onChange={handleUsernameChange}/>
              </div>
          </div>
          <div className='inputs'>
              <div className="input">
                  <img class="logo-container" src={password_icon} alt=""/>
                  <input type="password" placeholder='Password' value={password}
            onChange={handlePasswordChange}/>
              </div>
          </div>
          <div className='inputs'>
        <div className="input">
          <img class="logo-container" src={password_icon} alt=""/>
          <select
            value={usertype}
            onChange={handleTypeChange}
          >
            <option className="opt" value="cust">Select usertype</option>
            <option className="opt" value="customer">Customer</option>
            <option className="opt" value="admin">Admin</option>
          </select>
        </div>
      </div>

          {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password?<span>Click Here!</span></div>}
          
          <div className='submit-container'>
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleButtonSignup}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleButtonClick}>Login</div>

          </div>
      </div>
    </>
  )
}

  
export default LoginSignUp
