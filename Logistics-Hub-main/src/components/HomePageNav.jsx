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
                
               
            </nav>
        </div>
    );
};

export default HomePageNav;
