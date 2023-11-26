 import * as React from 'react';
import '../../index.css';
import { Divider} from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import SideNav from '../SideNav';

import { useState } from 'react';
import Switch from '@mui/material/Switch';

function Carriers() {
    
    const carriersInit = [
        { name: "FedEx", logo: "fedx.svg", switchState: true },
        { name: "UPS", logo: "ups.svg", switchState: false },
        { name: "USPS", logo: "usps.svg", switchState: true }
    ];

    const canCarriersInit = [
        { name: "Canada Post", logo: "canada.svg", switchState: true }
    ];

    const handleSwitchChange = (index) => {
        const updatedCarriers = [...carriers];
        updatedCarriers[index].switchState = !updatedCarriers[index].switchState;
        setCarriers(updatedCarriers);
    };

    const [carriers, setCarriers] = useState(carriersInit);

    const [canadaCarriers, setCanadaCarriers] = useState(canCarriersInit);

    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <div className='main-body'>
                <div style={{display:"flex"}}>
                    <SideNav/>
                    <div>
                        <h3>Carriers</h3>
                        <p>Use your existing contracts or discounted Shippo rates.</p>
                        <Divider/>
                        <h4>U.S. Domestic</h4>
                            {carriers.map((carrier, index) => (
                                <>
                                    <Divider/>
                                    <div style={{display:"flex", width:"700px", justifyContent:"space-between", padding:"30px", alignItems:"center"}}>
                                        <img src={carrier.logo} alt={carrier.name} style={{height:"150px"}}/>
                                        <div key={index}>
                                            <Switch checked={carrier.switchState} onChange={() => handleSwitchChange(index)} />
                                        </div>
                                    </div>
                                </>
                            ))}
                        <h4>Canada</h4>
                            {canadaCarriers.map((carrier, index) => (
                                <>
                                    <Divider/>
                                    <div style={{display:"flex", width:"700px", justifyContent:"space-between", padding:"30px", alignItems:"center"}}>
                                        <img src={carrier.logo} alt={carrier.name} style={{height:"150px"}}/>
                                        <div key={index}>
                                            <Switch checked={carrier.switchState} onChange={() => handleSwitchChange(index)} />
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Carriers;
