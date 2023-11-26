import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:"50px"
    },

    logo: {
        color: '#000',
        cursor:"pointer",
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            color: '#0077ff',
        },
    },
    divhead:{
        padding:"10px",
        background:"#efefef"
    },
    dropdown: {
        position: 'absolute',
        top: '50px',
        right: '0',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        minWidth: '100px',
        zIndex: '1',
        '& a': {
            display: 'block',
            color: '#000',
            textDecoration: 'none',
            padding: '5px 10px',
            '&:hover': {
                backgroundColor: '#f5f5f5',
            },
        },
    },
});

const Navbar = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(()=>{
        console.log(props.tab)
        setSelectedTab(props.tab)
    },[])

    const [selectedTab, setSelectedTab] = useState(props.tab)

    return (
        <div className={classes.divhead}>
            <nav className={classes.navbar}>
                <div style={{ display: 'flex', gap: '25px', justifyContent:"center", alignItems:"center"}}>
                    <div className={classes.logo} onClick={()=>navigate("/")}>
                        <img src="logonew.png" alt="Shipwise solutions" className="logo-image" />
                    </div>
                    <Link className={selectedTab === "shipments" ? 'nav-button-select' : 'nav-button-deselect'}  
                        onClick={()=>setSelectedTab("shipments") }
                        to={{
                            pathname: "/shipments",
                            state: { tab: 'shipments' } 
                        }}
                    >Home</Link>
                    <Link className={selectedTab === "orders" ? 'nav-button-select' : 'nav-button-deselect'}
                        onClick={()=>setSelectedTab("orders")}
                        to={{
                            pathname: "/orders",
                            state: { tab: 'orders' } 
                        }}
                    >Orders</Link>
                   
                    {/* <Link className={selectedTab === "products" ? 'nav-button-select' : 'nav-button-deselect'}  
                        onClick={()=>setSelectedTab("products") }
                        to={{
                            pathname: "/shipments",
                            state: { tab: 'products' } 
                        }}
                    >Products</Link> */}
                </div>
                <div style={{ display: 'flex', gap: '25px', paddingRight:"25px" }}>
                    <div style={{display:"flex", gap:"15px", fontSize:"15px"}}>
                        <Link to="/profile" onClick={()=>setSelectedTab("")} >Profile</Link>
                        <Link to="/billing" onClick={()=>setSelectedTab("")} >Billing</Link>
                        <Link to="/plan" onClick={()=>setSelectedTab("")} >Plan</Link>
                    </div>
                    <div className={classes.profile}>
                        <SettingsRoundedIcon onClick={() => navigate('/labels')} />
                    </div>
                    <div className={classes.profile}>
                        <FaceRoundedIcon onClick={handleDropdown} />
                        {showDropdown && (
                            <div className={classes.dropdown}>
                                <Link to="/profile" onClick={()=>setSelectedTab("")} >Profile</Link>
                                <Link to="/billing" onClick={()=>setSelectedTab("")} >Billing</Link>
                                <Link to="/plan" onClick={()=>setSelectedTab("")} >Plan</Link>
                                <Link to="/shipping" onClick={()=>setSelectedTab("")} >Shipping</Link>
                                <Link to="/logout" onClick={()=>setSelectedTab("")} >Logout</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};


export default Navbar;
