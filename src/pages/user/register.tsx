import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography,
     InputAdornment, Alert, Container, Backdrop, CircularProgress, IconButton } from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility } from '@mui/icons-material';
import "../../scss/pages/login.scss";
import { alertObj } from "../../types/global";
import axios from "axios";
import { VHOST } from "../../vhost";

const RegisterPage = () => {
    let UserField = React.useRef<HTMLInputElement>();
    let PasswdField = React.useRef<HTMLInputElement>();
    let rePasswdField = React.useRef<HTMLInputElement>();
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    let [alert, setAlert] = useState<alertObj>();
    const sendData = () => {
        //? warning, success
        if (PasswdField.current?.value !== rePasswdField.current?.value) {
            setAlert({ message: "Passwords don't match"})
        } else {
            setOpenBackDrop(true);
            axios.post(VHOST+"/api/register", {
                username: UserField.current?.value,
                password: PasswdField.current?.value
            })
            .then(response => {
                if (response.data.message === "Success") {
                    window.location.replace("/login");
                }
            }, (error) => {
               setAlert(error.response.data);
               setOpenBackDrop(false);
            })
        };
    };
    return (
        <React.Fragment>
            <Container>
                <div className="alertContainer">
                    { (alert && alert.message) &&
                    // @ts-ignore
                    <Alert sx={{ width: 600 }} severity="warning">{alert.message}</Alert>}
                </div>
            </Container>
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
                                <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={PasswdField} id="outlined-name" color="secondary" label="Password"
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
                                <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={rePasswdField} id="outlined-name" color="secondary" label="Password"
                                    variant="filled" margin="dense" helperText="Choose strong password." onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            sendData();
                                        }}
                                    }
                                    InputProps={{
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
                            <Backdrop
                              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                              open={openBackDrop}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <div className="outside-link-container">
                                <a href="/login" className="outside-link">Already have an account?</a>
                            </div>
                        </Grid>
                    </Grid>

                </div>
            </div>
        </React.Fragment>
    );
};


export default RegisterPage;