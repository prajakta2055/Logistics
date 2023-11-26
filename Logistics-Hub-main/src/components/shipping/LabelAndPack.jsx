import * as React from 'react';
import '../../index.css';
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import SideNav from '../SideNav';

import { FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel } from '@mui/material';

function LabelAndPack() {
    const [printPreferences, setPrintPreferences] = React.useState('');
    const [labelSize, setLabelSize] = React.useState('');
    const [packagingSlipFormat, setPackagingSlipFormat] = React.useState('');
    const [addTextOnLabel, setAddTextOnLabel] = React.useState(false);
    const [addStorePolicyOnPacking, setAddStorePolicyOnPacking] = React.useState(false);
    const [showPricingOnPacking, setShowPricingOnPacking] = React.useState(false);
    const [selectedCarrier, setSelectedCarrier] = React.useState(''); 


    const handleCarrierChange = (event) => { setSelectedCarrier(event.target.value); }; 
    
    const carriers = ['FedEx', 'UPS', 'USPS', 'DHL'];

    const handlePrintPreferencesChange = (event) => {
        setPrintPreferences(event.target.value);
    };

    const handleLabelSizeChange = (event) => {
        setLabelSize(event.target.value);
    };

    const handlePackagingSlipFormatChange = (event) => {
        setPackagingSlipFormat(event.target.value);
    };

    const handleAddTextOnLabelChange = (event) => {
        setAddTextOnLabel(event.target.checked);
    };

    const handleAddStorePolicyOnPackingChange = (event) => {
        setAddStorePolicyOnPacking(event.target.checked);
    };

    const handleShowPricingOnPackingChange = (event) => {
        setShowPricingOnPacking(event.target.checked);
    };

    return (
        <div style={{ width: "100%" }}>
            <Navbar />
            <div className='main-body'>
                <div style={{ display: "flex" }}>
                    <SideNav />
                    <div>
                        <h3>Labels & Packing Slips</h3>
                        <p>Set printing, sizing, and service level templates.</p>
                        <Divider style={{padding:"2px"}}/>
                        <div style={{display:"flex",    width: "700px", justifyContent: "space-between"}}>
                            <div>
                                <h4>Print Preferences</h4>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="print-preferences-label">Print Preferences</InputLabel>
                                    <Select
                                        labelId="print-preferences-label"
                                        id="print-preferences"
                                        value={printPreferences}
                                        label="Print Preferences"
                                        onChange={handlePrintPreferencesChange}
                                    >
                                        <MenuItem value={'separate'}>Print labels and packaging slips separately</MenuItem>
                                        <MenuItem value={'single-page'}>Single page label and packaging slip</MenuItem>
                                    </Select>
                                </FormControl>
                                {printPreferences === 'separate' && (
                                    <div>
                                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel id="label-size-label">Label Size</InputLabel>
                                            <Select
                                                labelId="label-size-label"
                                                id="label-size"
                                                value={labelSize}
                                                label="Label Size"
                                                onChange={handleLabelSizeChange}
                                            >
                                                <MenuItem value={'8.5x11'}>8.5 x 11 in PDF</MenuItem>
                                                <MenuItem value={'4x6'}>4 x 6 in PDF</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                                            <InputLabel id="packaging-slip-format-label">Packaging Slip Format</InputLabel>
                                            <Select
                                                labelId="packaging-slip-format-label"
                                                id="packaging-slip-format"
                                                value={packagingSlipFormat}
                                                label="Packaging Slip Format"
                                                onChange={handlePackagingSlipFormatChange}
                                            >
                                                <MenuItem value={'8.5x11'}>8.5 x 11 in PDF</MenuItem>
                                                <MenuItem value={'4x6'}>4 x 6 in PDF</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                )}

                                {printPreferences === 'single-page' && (
                                    <p style={{borderLeft:"2px solid #191919", paddingLeft:"8px", marginLeft:"8px"}}>Label & packing slip format: 8.5 x 11 in PDF</p>
                                )}
                            </div>
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", padding:"10px"}}>
                                <FormControlLabel
                                    control={<Checkbox checked={addTextOnLabel} onChange={handleAddTextOnLabelChange} />}
                                    label="Add text on label"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={addStorePolicyOnPacking} onChange={handleAddStorePolicyOnPackingChange} />}
                                    label="Add store policy on packing"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={showPricingOnPacking} onChange={handleShowPricingOnPackingChange} />}
                                    label="Show pricing on packing"
                                />
                            </div>
                        </div>
                        <Divider style={{padding:"20px"}}/>
                        <div style={{display:"flex",    width: "700px", justifyContent: "space-between"}}></div><div style={{display:"flex"}}>
                            <div>
                                <h4>Default service level</h4>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="carrier-label">Carrier</InputLabel>
                                    <Select
                                        labelId="carrier-label"
                                        id="carrier"
                                        value={selectedCarrier}
                                        label="Carrier"
                                        onChange={handleCarrierChange}
                                    >
                                        {carriers.map((carrier) => (
                                            <MenuItem key={carrier} value={carrier}>
                                                {carrier}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <Divider style={{padding:"20px"}}/>
                        <div style={{display:"flex",    width: "700px", justifyContent: "space-between"}}></div><div style={{display:"flex"}}>
                            <div>
                                <h4>Default Return label service level</h4>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="carrier-label">Carrier</InputLabel>
                                    <Select
                                        labelId="carrier-label"
                                        id="carrier"
                                        value={selectedCarrier}
                                        label="Carrier"
                                        onChange={handleCarrierChange}
                                    >
                                        {carriers.map((carrier) => (
                                            <MenuItem key={carrier} value={carrier}>
                                                {carrier}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LabelAndPack;
