import * as React from 'react';
import '../../index.css';
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import SideNav from '../SideNav';

import { useState } from 'react';
import TextField from '@mui/material/TextField';

function CompanyInfo() {
    const [companyName, setCompanyName] = useState('Acme Inc.');
    const [website, setWebsite] = useState('www.acme.com');
    const [email, setEmail] = useState('info@acme.com');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleTwitterChange = (event) => {
        setTwitter(event.target.value);
    };

    const handleFacebookChange = (event) => {
        setFacebook(event.target.value);
    };

    const handleInstagramChange = (event) => {
        setInstagram(event.target.value);
    };

    return (
        <div style={{ width: "100%" }}>
            <Navbar />
            <div className='main-body'>
                <div style={{ display: "flex" }}>
                    <SideNav />
                    <div>
                        <h3>Company Info</h3>
                        <p>Your company details will be used on your packing slips, tracking pages and emails for your customers.</p>
                        <Divider />
                         <h4 style={{marginBottom:"0"}}>Company Info</h4>
                        <div style={{ padding: "20px" }}>
                            <TextField
                                label="Company Name"
                                value={companyName}
                                onChange={handleCompanyNameChange}
                                margin="normal"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                label="Website"
                                value={website}
                                onChange={handleWebsiteChange}
                                margin="normal"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={handleEmailChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>

                        <h4 style={{marginBottom:"0"}}>Social Media</h4>
                        <div style={{ padding: "20px" }}>
                            <TextField
                                label="Twitter URL"
                                value={twitter}
                                onChange={handleTwitterChange}
                                margin="normal"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                label="Facebook URL"
                                value={facebook}
                                onChange={handleFacebookChange}
                                margin="normal"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                label="Instagram URL"
                                value={instagram}
                                onChange={handleInstagramChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyInfo;