 import * as React from 'react';
import '../App.css';
import { Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import VisaIcon from '../content/visa.png'
import MasterIcon from '../content/master.png'
import DiscoverCard from '../content/discover.png'
import American from '../content/amer.png'

import Box from '@mui/material/Box';
import Navbar from './Navbar';

function Billing() {
    const [role, setRole] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [language, setLanguage] = React.useState("")
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardName, setCardName] = React.useState("");
    const [expiryDate, setExpiryDate] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [promoCode, setPromoCode] = React.useState("")

    const cardImages = [
        American,
        DiscoverCard,
        MasterIcon,
        VisaIcon,
    ];

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    }

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

    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };

    const handleCardNameChange = (event) => {
        setCardName(event.target.value);
    };

    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value);
    };

    const handleCvvChange = (event) => {
        setCvv(event.target.value);
    };

    const handleAddCard = () => {
        // Add card details to database or perform payment processing
        setOpen(false);
    };

    return (
        <div style={{width: "100%"}}>
            <Navbar/>
            <h3>Billing</h3>
            <Divider/>
            <div style={{margin:"30px", display:"flex", gap:"100px"}}>
                <div>
                    <h4>Payment Methods</h4>
                    <p>Add a credit card to get started</p>
                    <div style={{display: "flex", overflowX: "scroll"}}>
                        {cardImages.map((image, index) => (
                            <img key={index} width= "35px" src={image} alt={`Card ${index + 1}`} style={{marginRight: "10px"}} />
                        ))}
                    </div>
                    <Button variant="contained" onClick={handleClickOpen} style={{marginTop: "20px"}}>
                        Add Credit/Debit Card
                    </Button>
                </div>
                <div>
                    <h4>Discount</h4>
                    <p>Have promo code? </p>
                    <TextField
                        margin="dense"
                        id="promoCode"
                        label="Promo Code"
                        type="text"
                        fullWidth
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                    />
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Credit/Debit Card</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cardNumber"
                            label="Card Number"
                            type="text"
                            fullWidth
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                        />
                        <TextField
                            margin="dense"
                            id="cardName"
                            label="Card Name"
                            type="text"
                            fullWidth
                            value={cardName}
                            onChange={handleCardNameChange}
                        />
                        <TextField
                            margin="dense"
                            id="expiryDate"
                            label="Expiry Date"
                            type="text"
                            fullWidth
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                        />
                        <TextField
                            margin="dense"
                            id="cvv"
                            label="CVV"
                            type="text"
                            fullWidth
                            value={cvv}
                            onChange={handleCvvChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddCard}>Add Card</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Billing;
