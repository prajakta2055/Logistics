 import * as React from 'react';
import '../App.css';
import { Divider} from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from './Navbar';

function Shipping() {
    

    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <h3>Labels & Packing Slips</h3>
            <Divider/>
            <h3>Carriers</h3>
            <Divider/>
            <h3>Packaging</h3>
            <Divider/>
            <h3>Tracking</h3>
            <Divider/>
            <h3>Insurance</h3>
        </div>
    );
}

export default Shipping;
