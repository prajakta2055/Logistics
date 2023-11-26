import React from 'react';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import '../css/Homepage.css';
import HomePageNav from './HomePageNav';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Directions, UpdateTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Home from './home/Home';

const useStyles = makeStyles({
  img:{
    height: "400px",
    width: "100%",
  },
  button:{
    width: "500px",
    height:" 150px",
  },
  selectedButton: {
    width: "500px",
    height:" 150px",
    border : "2px solid black",
  },
  div:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    gap:"20px",
    padding:"20px",
  },
  text:{
    width:"758px",
    border:"solid",
    marginTop:"33px",
    borderRadius:"15px",
    textAlign:"center",
    padding:"13px"
  },
  textLabel:{
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
  },
});

const Homepage = () => {
  const [delivery,setdelivery]  = useState('');
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         // Enable automatic sliding
    autoplaySpeed: 5000,  
  };

  const updateDelivery = (service) => {
    setdelivery(service);
  }
  
  return (
    <div className="App">
      <HomePageNav isHome={true}/>
        <Home/>
    </div>
  );
};

export default Homepage;
