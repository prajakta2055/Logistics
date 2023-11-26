 import * as React from 'react';
import '../../index.css';
import { Divider} from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import SideNav from '../SideNav';

function Tracking() {
    

    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <div className='main-body'>
                <div style={{display:"flex"}}>
                    <SideNav/>
                    <div>
                        <h3 >Tracking</h3>
                        
                    </div>
                </div>
            </div>        
        </div>
    );
}

export default Tracking;
