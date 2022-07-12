import { Dialog, DialogTitle, DialogContent, 
    DialogContentText, TextField, DialogActions,
     Button, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import React, { useState } from "react";
import axios from "axios";

const DialogMasterPass = ({ open, handleClose, setMasterPass }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passValue, setPassValue] = useState("");
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const ValidateMasterPass = () => {
        setMasterPass(passValue);
        // axios.post("/api/account/")
        //      .then(response => {
        //         setMasterPass(passValue);
        //      }, (error) => {
        //         console.warn("Master Password error:", error);
        //      })
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div style={{ backgroundColor: "#131515"}}>
                <DialogTitle>Enter your Master Password</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>

                    </DialogContentText>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                ValidateMasterPass()
                            }
                        }} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={ValidateMasterPass}>Save</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default DialogMasterPass;