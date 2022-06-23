import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography,
        InputAdornment, Alert, Container, Backdrop, 
        CircularProgress } from "@mui/material";
import { AccountCircle, Password } from '@mui/icons-material';
import "../../scss/pages/login.scss";
import { alertObj } from "../../types/global";
import axios from "axios";


const LoginPage = () => {
    const UserField = React.useRef<HTMLInputElement>();
    const PasswdField = React.useRef<HTMLInputElement>();
    const [alert, setAlert] = useState<alertObj>();
    const [openBackDrop, setOpenBackDrop] = useState(false);

    const sendData = () => {
        //? warning, success
        setOpenBackDrop(true);
        axios.post("/login")
        //@ts-ignore
             .then(response => response.json())
             .then(data => setAlert(data))
    };

    return (
        <div className="App">
            <Container>
                <div className="alertContainer">
                    { (alert && alert.severity && alert.message) &&
                    // @ts-ignore
                    <Alert sx={{ width: 600 }} severity={alert.severity}>{alert.message}</Alert>}
                </div>
            </Container>
            <div className="Main">
                <div className="LoginMain">
                    <Typography variant="h4">
                        Welcome Back!
                    </Typography>
                    <Typography variant="subtitle1">
                        We're happy to see you again.
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
                                <TextField fullWidth type={"password"} inputRef={PasswdField} onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendData();
                                    }
                                }} 
                                id="outlined-name" color="secondary" label="Password"
                                    variant="filled" margin="dense" InputProps={{
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
                                Login
                            </Button>
                            <Backdrop
                              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                              open={openBackDrop}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <div className="outside-link-container">
                                <a href="/register" className="outside-link">Need an account?</a>
                            </div>
                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
};


export default LoginPage;