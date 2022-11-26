import React, { useState } from "react";
import {
    TextField, Button, Grid, Box, Typography,
    InputAdornment, Alert, Container, Backdrop,
    CircularProgress, IconButton
} from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility } from '@mui/icons-material';
import "../../scss/pages/login.scss";
import { alertObj } from "../../types/global";
import axios from "axios";
import { VHOST } from "../../vhost";

const LoginPage = () => {
    const UserField = React.useRef<HTMLInputElement>();
    const PasswdField = React.useRef<HTMLInputElement>();
    const [alert, setAlert] = useState<alertObj>();
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const sendData = () => {
        //? warning, success
        setOpenBackDrop(true);
        axios.post(VHOST + "/api/login", {
            username: UserField.current?.value,
            password: PasswdField.current?.value
        })
            .then(response => {
                if (response.data.message === "Success") {
                    localStorage.setItem("token", "MmIwNGIwNjItNGE2Yi00Nzg2LWEwYTktMzQ5ZDcxMjE3NWM3");
                    window.location.replace("/dashboard");
                }
            }, (error) => {
                console.log("Login error: ", error);
                if (error.response.data?.message) {
                    setAlert({ message: error.response.data.message });
                } else {
                    setAlert({ message: error.response.message })
                }

                setOpenBackDrop(false);
            })
    };

    return (
        <div className="App">
            <Container>
                <div className="alertContainer">
                    {(alert && alert.message) &&
                        // @ts-ignore
                        <Alert sx={{ width: 600 }} severity="warning">{alert.message}</Alert>}
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
                                    }} onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendData();
                                        }
                                    }} />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{
                                width: 350,
                                maxWidth: '100%',
                            }}>
                                <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={PasswdField} onKeyDown={(e) => {
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
                                        ),
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