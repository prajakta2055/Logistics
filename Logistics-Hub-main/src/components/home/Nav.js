import React from 'react';
// import data
import { nav } from './data';

import Chatgpt from '../Chatgpt';
import Nearme from '../Nearme';
const Nav = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopup2, setShowPopup2] = React.useState(false);
  return (
    <nav>
      {showPopup &&
        <div style={{
          background: "black",
          color: "white",
          position: "absolute",
          border: "2px solid black",
          dropShadow: "10px 10px 10px black",
          bottom: "100px",
          zIndex: "999",
        }}>
          <Chatgpt/>
        </div>
      }
      {showPopup2 &&
        <div style={{
          background: "black",
          color: "white",
          position: "absolute",
          border: "2px solid black",
          dropShadow: "10px 10px 10px black",
          bottom: "100px",
          zIndex: "999",
        }}>
          <Nearme/>
        </div>
      }
      <ul className='flex gap-x-10'>
      {nav.map((item, index) => {
            if(item.name === "Recommendation"){
              return(
                <>
                <li style={{cursor:"pointer"}} key={index} onClick={()=>{
                  setShowPopup(!showPopup)
                }}>Recommendation</li>
                </>
              )
            }
            if(item.name === "Near me"){
              return(
                <>
                <li style={{cursor:"pointer"}} key={index} onClick={()=>{
                  setShowPopup2(!showPopup)
                }}>Nearme</li>
                </>
              )
            }
            // destructure item
            const { href, name } = item;
            return (
              <li key={index}>
                <a className='hover:text-accent transition' href={href}>
                  {name}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Nav;
