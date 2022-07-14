import { Dialog, DialogTitle, DialogContent, 
    DialogContentText, TextField, DialogActions,
     Button, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const DialogPass = ({ open, handleClose, PasswdContent="", identifierContent="", uuid="null", handleSavePass, setOpenDialogPass, GenerateRandomPass, decryptAES }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passValue, setPassValue] = useState(PasswdContent);
    const [identifierValue, setIdentifierValue] = useState(identifierContent);
    const handleClickShowPassword = () => setShowPassword(true);
    const handleMouseDownPassword = () => setShowPassword(false);
    
    useEffect(() => {
        if (PasswdContent) {
            let decodedPasswd : string = decryptAES(PasswdContent);
            if (decodedPasswd) {
                setPassValue(decryptAES(PasswdContent));
            };
        };
        if (identifierContent) {
            let decodedIdentifier : string = decryptAES(identifierContent);
            if (decodedIdentifier) {
                setIdentifierValue(decodedIdentifier);
            }
        };
    }, [PasswdContent, identifierContent, decryptAES])
    

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
                    <Button variant="contained" onClick={() => {GenerateRandomPass(setPassValue)}}>Random Password</Button>
                    <div style={{flex: "1 0 0"}} />
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => {handleSavePass(identifierValue, passValue, uuid, setOpenDialogPass)}}>Save</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default DialogPass;