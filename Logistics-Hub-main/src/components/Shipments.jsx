 import * as React from 'react';
import '../index.css';
import { Divider} from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from './Navbar';

function Shipments() {
    
    React.useEffect(()=>{

    },[])

    return (
        <div style={{width: "100%"}}>
            <Navbar 
                tab={"shipments"}
            />
            <div className='main-body'>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h4>
                        No Shipments yet. But you'll be there soon. Welcome 🎉
                    </h4>
                </div>
            </div>        
        </div>
    );
}

export default Shipments;