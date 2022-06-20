import React from "react";
import NavbarComponent from "../../components/header/navbar";
import CirclesAnimation from "../../components/animation/circles";
import { TextField, Button, Grid, Box, Typography, InputAdornment } from "@mui/material";
import { AccountCircle, Password } from '@mui/icons-material';
import "../../scss/pages/login.scss";
import axios from "axios";

const RegisterPage = () => {
    let UserField = React.useRef<HTMLInputElement>();
    let PasswdField = React.useRef<HTMLInputElement>();
    let rePasswdField = React.useRef<HTMLInputElement>();
    const sendData = () => {
        axios.post("/login")
             .then(response => console.log(response))
    };
    return (
        <React.Fragment>
            <NavbarComponent />
            <div className="Main">
                <div className="LoginMain">
                    <Typography variant="h4">
                        Create an account
                    </Typography>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{
                                    width: 350,
                                    maxWidth: '100%',
                                }}>
                                <TextField fullWidth inputRef={UserField} id="outlined-name" color="secondary" label="Username"
                                    variant="filled" margin="dense" InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{
                                    width: 350,
                                    maxWidth: '100%',
                                }}>
                                <TextField fullWidth type={"password"} inputRef={PasswdField} id="outlined-name" color="secondary" label="Password"
                                    variant="filled" margin="dense" InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Password />
                                            </InputAdornment>
                                        )
                                    }} />
                                <TextField fullWidth type={"password"} inputRef={rePasswdField} id="outlined-name" color="secondary" label="Password"
                                    variant="filled" margin="dense" helperText="Choose strong password." InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Password />
                                            </InputAdornment>
                                        )
                                    }} />
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3}>
                            <Button sx={{ width: 350, maxWidth: '100%' }} 
                                variant="contained" color="primary" onClick={sendData}>
                                Register
                            </Button>
                            <div className="outside-link-container">
                                <a href="/login" className="outside-link">Already have an account?</a>
                            </div>
                        </Grid>
                    </Grid>

                </div>
            </div>
            <CirclesAnimation />
        </React.Fragment>
    );
};


export default RegisterPage;