import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { header } from './data';
import { HiMenuAlt4, HiOutlineX } from 'react-icons/hi';
import MobileNav from './MobileNav';
import Nav from './Nav';

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { logo, btnText } = header;
  const navigate = useNavigate(); // initialize useHistory hook

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? 'lg:top-0 bg-white shadow-md' : 'lg:top-[60px]'
      } py-6 lg:py-4 fixed w-full transition-all z-10`}
    >
      <div className='container mx-auto flex justify-between items-center'>
        <a href='#feature' data-aos='fade-down' data-aos-delay='1000'>
        </a>
        <div
          className='hidden lg:flex'
          data-aos='fade-down'
          data-aos-delay='1200'
        >
          <Nav />
        </div>
        <a href='#formlink'>
          <button
            className='btn btn-sm btn-outline hidden lg:flex'
            data-aos='fade-down'
            data-aos-delay='1400'
            onClick={() => navigate('/login')} 
          >
            {btnText}
          </button>
        </a>
        <button className='lg:hidden' onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className='text-3xl text-accent' />
          ) : (
            <HiMenuAlt4 className='text-3xl text-accent' />
          )}
        </button>
        <div
          className={`${
            mobileNav ? 'left-0' : '-left-full'
          }  fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav setMobileNav={setMobileNav} />
        </div>
      </div>
    </header>
  );
};

export default Header;
