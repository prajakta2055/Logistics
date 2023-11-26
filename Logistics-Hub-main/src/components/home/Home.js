import React from 'react';

// import aos
import Aos from 'aos';
// import aos css
import 'aos/dist/aos.css';

// import components
import Header from './Header';
import Hero from './Hero';
import Feature1 from './Feature1';
import Feature2 from './Feature2';
import Feature3 from './Feature3';
import Product from './Product';
import Testimonials from './Testimonials';
import Cta from './Cta';
// import Footer from './Footer';
import From from './Form';
import './home.css'

const Home = () => {
  // initialize aos
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div className='overflow-hidden' style={{background:"#fff", width:"100vw", display:"block"}}>
      <Header style={{background:"#fff", width:"100%"}}/>
      <Hero />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Product />
      <From />
      <Testimonials />
      <Cta />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
