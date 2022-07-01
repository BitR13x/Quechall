import { Dialog, DialogTitle, DialogContent, 
    DialogContentText, TextField, DialogActions,
     Button, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";
import { VHOST } from "../vhost";

const DialogPass = ({ open, handleClose, PasswdContent="", identifierContent="", uuid="null" }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passValue, setPassValue] = useState(PasswdContent);
    const [identifierValue, setIdentifierValue] = useState(identifierContent);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const [snackBarStatus, setSnackBarStatus] = useState({open: false, message: "", severity: false});
    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarStatus({open: false, message: "", severity: false});
    };

    const handleSave = () => {
        if (!passValue) {
            setSnackBarStatus({open: true, message: "Password cannot be empty!", severity: false});
            return;
        };
        axios.post(VHOST+"/api/vault/passwd-save/"+uuid, {
            identifier: identifierValue,
            content: passValue
        })
             .then(response => {
                setSnackBarStatus({open: true, message: "Password was saved sucessfully!", severity: true});
             }, (error) => {
                console.log(error)
                setSnackBarStatus({open: true, message: "Something went wrong!", severity: false});
             });
    };

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
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
                <Snackbar open={snackBarStatus.open} autoHideDuration={4000} onClose={handleCloseSnacBar}>
                    <Alert onClose={handleCloseSnacBar} severity={snackBarStatus.severity ? "success" : "error"} sx={{ width: '100%' }}>
                        {snackBarStatus.message}
                    </Alert>
                </Snackbar>
            </div>
        </Dialog>
    );
}

export default DialogPass;