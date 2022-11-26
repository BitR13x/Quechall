import React, { useState } from "react";
import {
    TextField, Button, Grid, Box, Typography,
    InputAdornment, Alert, Container, Backdrop, CircularProgress, IconButton
} from "@mui/material";
import { AccountCircle, Password, VisibilityOff, Visibility, Key } from '@mui/icons-material';
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
    const handleClickShowPassword = () => setShowPassword(true);
    const handleMouseDownPassword = () => setShowPassword(false);

    let MasterPassField = React.useRef<HTMLInputElement>();
    const [showMasterPassword, setShowMasterPassword] = useState(false);
    const handleClickShowMasterPassword = () => setShowMasterPassword(true);
    const handleMouseDownMasterPassword = () => setShowMasterPassword(false);

    let [alert, setAlert] = useState<alertObj>();
    const sendData = () => {
        if (!UserField.current?.value || !PasswdField.current?.value || !MasterPassField.current?.value) {
            setAlert({ message: "These fields are required: Username, Password, Master password" });
            return;
        };

        //? warning, success
        if (PasswdField.current?.value !== rePasswdField.current?.value) {
            setAlert({ message: "Passwords don't match" })
        } else {
            setOpenBackDrop(true);
            axios.post(VHOST + "/api/register", {
                username: UserField.current?.value,
                password: PasswdField.current?.value,
                masterpass: MasterPassField.current?.value
            })
                .then(response => {
                    if (response.data.message === "Success") {
                        window.location.replace("/login");
                    }
                }, (error) => {
                    if (error.response.data?.message) {
                        setAlert({ message: error.response.data.message });
                    } else {
                        setAlert({ message: error.response.message })
                    }
                    setOpenBackDrop(false);
                })
        };
    };
    return (
        <React.Fragment>
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
                                <TextField fullWidth type={showPassword ? "text" : "password"} inputRef={rePasswdField} id="outlined-name" color="secondary" label="Verify password"
                                    variant="filled" margin="dense" helperText="Choose strong password." onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            sendData();
                                        }
                                    }
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Password />
                                            </InputAdornment>
                                        )
                                    }} />
                            </Box>
                            <div style={{ marginTop: "2vh" }}></div>
                            <TextField fullWidth type={showMasterPassword ? "text" : "password"} inputRef={MasterPassField} id="outlined-name" color="secondary" label="Master Password"
                                variant="filled" margin="dense" helperText="This password is for encryption." InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Key />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowMasterPassword}
                                                onMouseDown={handleMouseDownMasterPassword}
                                            >
                                                {showMasterPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} onKeyDown={e => { if (e.key === "Enter") { sendData(); } }} />
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