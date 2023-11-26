import * as React from 'react';
import '../App.css';
import { Divider } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Box from '@mui/material/Box';
import Navbar from './Navbar';

function Profile() {
    const [role, setRole] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [language, setLanguage] = React.useState("")

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleLangChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <h3>Profile</h3>
            <Divider/>
            <Box
                component="form"
                style={{display:"flex", gap:"50px", margin:"30px"}}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handleRoleChange}
                    >
                    <MenuItem value={10}>Account Owner</MenuItem>
                    <MenuItem value={20}>Technician</MenuItem>
                    <MenuItem value={30}>Delivery Person</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Divider/>


            <div style={{display:"flex", justifyContent:"space-between",  alignItems:"center"}}>
                <h3>Password</h3>
                <Button onClick={handleClickOpen}>Change Password</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="old-password" label="Old Password" type="password" fullWidth />
                        <TextField margin="dense" id="new-password" label="New Password" type="password" fullWidth />
                        <TextField margin="dense" id="confirm-password" label="Confirm Password" type="password" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Divider/>
            <div style={{display:"flex", justifyContent:"space-between",  alignItems:"center"}}>
                <h3>Language</h3>
                <Box
                    component="form"
                    style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            label="Language"
                            onChange={handleLangChange}
                            >
                            <MenuItem value={10}>English</MenuItem>
                            <MenuItem value={20}>Spanish</MenuItem>
                            <MenuItem value={30}>French</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </div>
    );
}

export default Profile;
