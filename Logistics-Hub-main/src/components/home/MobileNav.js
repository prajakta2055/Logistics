import React from "react";
// import data
import { nav } from "./data";

const MobileNav = ({ setMobileNav }) => {
  return (
    <div 
    onMouseLeave={() => setMobileNav(false)}
    className="bg-accent/95 w-full h-full">
      <ul className="h-full flex flex-col justify-center items-center gap-y-8">
        {nav.map((item, index) => {
          // destructure item
          const { href, name } = item;
          return (
            <li key={index}>
              <a className="link text-white text-xl" href={href}>
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
