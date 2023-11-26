import React from 'react';


import '../css/Homepage.css'; // Import your CSS file

const Header = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <img src="logonew.png" alt="Shipwise solutions" className="logo-image" />
        </div>
        <nav className="navigation">
          <ul>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search for services..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
      </header>
      </div>
);
};

export default Header