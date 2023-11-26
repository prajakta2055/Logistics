// SideNav.js
import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom';

function SideNav() {
    function SubList({ title, items }) {
        return (
            <div className="sublist">
                <h3>{title}</h3>
                <ul className='ul-ele'>
                    {items.map((item, index) => (
                        <Link className='link' to={"/" + item[1]}>
                            <li className="list-item" key={index}>{item[0]}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
  return (
    <div className="sidenav">
      <SubList title="Shipping" items={[['Labels & packing slips',"labels"], ['Carriers',"carriers"], ["Packages","packages"], ["Tracking","tracking"], ["Rates","Rates"]]} />
      <SubList title="Business" items={[['Stores',"stores"], ['Company info',"company-info"], ['Sender addresses',"sender-addresses"]]} />
      <SubList title="Account" items={[['Billing',"billing"], ['Plan',"plan"], ['Profile',"profile"]]} />
    </div>
  );
}

export default SideNav;