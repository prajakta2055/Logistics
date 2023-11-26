import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles({
    navbar: {
        display: 'flex',
        alignItems: 'center',
    },

    logo: {
        color: '#000',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    divhead:{
        backgroundColor: '#efefef',
    },
    button:{
        border:"none",
        background:"none",
        fontSize:"medium",
        cursor: "pointer",
    },
});

const HomePageNav = (props) => {
    const classes = useStyles();
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
    
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      };

    return (
        <div style={props.isHome ?{background:"#fff"}:{}} className={classes.divhead}>
            <nav className={classes.navbar} style={{display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0px 20px"}}>
                <div className={classes.logo}>
                    <img src="logonew.png" alt="Shipwise solutions" className="logo-image" />
                </div>
                <nav className="navigation">
                    <ul>
                        {/* <li><button className={classes.button} href="homepage">
                        <Link to="/homepage" style={{color:"black", fontSize:"medium"}}>Home</Link></button></li>
                        <li><button className={classes.button} onClick={() => scrollToSection('services-highlights')}>Services</button></li>
                        <li><button className={classes.button} onClick={() => scrollToSection('service-providers')}>Service Providers</button></li>
                        <li><button className={classes.button} onClick={() => scrollToSection('logistics-hub-content')}>Coverage</button></li>
                        <li><button className={classes.button} onClick={() => scrollToSection('about-us')}>About us</button></li> */}
                    </ul>
                </nav>
                {/* <div>
                    <Button className={classes.button}  style={{color:"black"}}href="/login">Login</Button>
                    <Button className={classes.button}  style={{color:"black"}}href="/Signup">Signup</Button>
                </div> */}
            </nav>
        </div>
    );
};

export default HomePageNav;
