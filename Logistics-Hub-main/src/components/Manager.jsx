import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { makeStyles } from '@mui/styles';
import { useUser } from './userContext';

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
    const { user, logout } = useUser();
    const { usertype, username } = user;

    const handleLogout = () => {
        navigate("/");
        logout();
        console.log(username);
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
                    <Link
    className={selectedTab === "Manager" ? 'nav-button-select' : 'nav-button-deselect'}
    to={{
        pathname: "/Manager",
        state: { tab: 'Manager' },
    }}
>
    Home
</Link>
{/* 
                    <Link className={selectedTab === "orders" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/orders",
                            state: { tab: 'orders' } 
                        }}
                    >Orders</Link> */}
                    <Link className={selectedTab === "DataAnalytics" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/DataAnalytics",
                            state: { tab: 'DataAnalytics' } 
                        }}
                    >DataAnalytics</Link>
                    <Link className={selectedTab === "AddProvider" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/AddProvider",
                            state: { tab: 'AddProvider' } 
                        }}
                    >Add</Link>
                    <Link className={selectedTab === "UpdateProvider" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/UpdateProvider",
                            state: { tab: 'UpdateProvider' } 
                        }}
                    >Update/Delete</Link>
                    <Link className={selectedTab === "newOrder" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/Report",
                            state: { tab: 'Report' } 
                        }}
                    >Reports</Link>
                    <Link className={selectedTab === "newOrder" ? 'nav-button-select' : 'nav-button-deselect'}
                        to={{
                            pathname: "/CRUD_user",
                            state: { tab: 'CRUD_user' } 
                        }}
                    >Reports</Link>
                    {/* <Link className={selectedTab === "products" ? 'nav-button-select' : 'nav-button-deselect'}  
                        onClick={()=>setSelectedTab("products") }
                        to={{
                            pathname: "/shipments",
                            state: { tab: 'products' } 
                        }}
                    >Products</Link> */}
                </div>
                <div style={{ display: 'flex', gap: '25px', paddingRight:"25px" }}>
                    <p>Hi, {username}</p>
                    <div className={classes.logo} onClick={handleLogout}>Logout</div>
                </div>
            </nav>
        </div>
    );
};


export default Navbar;
