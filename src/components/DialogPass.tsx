import { Dialog, DialogTitle, DialogContent, 
    DialogContentText, TextField, DialogActions,
     Button, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const DialogPass = ({ open, handleClose, PasswdContent, identifierContent }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passValue, setPassValue] = useState("");
    const [identifierValue, setIdentifierValue] = useState("");   
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    useEffect(()=> {
        if (PasswdContent) setPassValue(PasswdContent);
        if (identifierContent) setIdentifierValue(identifierContent);
    },[])

    const GenerateRandomPass = () => {
        let UpperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let LowerChars = "abcdefghijklmnopqrstuvwxyz";
        let numbers = "0123456789";
        let symbols = "@#$%!?";
        let everything = UpperChars + LowerChars + numbers + symbols;
        let pwdLen = 24
        let randomstring = Array(pwdLen).fill(everything).map((x) => { return x[Math.floor(Math.random() * x.length)] }).join('');

        setPassValue(randomstring);
    };
    
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div style={{ backgroundColor: "#131515"}}>
                <DialogTitle>CREATE A PASSWORD</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={identifierValue}
                        margin="dense"
                        id="name"
                        label="Identifier"
                        type="text"
                        fullWidth
                        variant="standard"
                        color="secondary"
                        onChange={(e) => setIdentifierValue(e.target.value)}
                    />
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                        value={passValue}
                        onChange={(e) => setPassValue(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type={showPassword ? "text" :  "password"}
                        fullWidth
                        variant="standard"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={GenerateRandomPass}>Random Password</Button>
                    <div style={{flex: "1 0 0"}} />
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleClose}>Save</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default DialogPass;