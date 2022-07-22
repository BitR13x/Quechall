import { Grid, Container, Typography, Button, 
    Divider, Avatar, TextField, Checkbox,
    InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import DialogDelete from '../../components/DialogDelete';
import { ProfilePrefsContext } from "../../components/Store/Store";
import "../../scss/pages/profileSettings.scss";
import { VHOST } from "../../vhost";

const ProfileSettings = () => {
    var user = {username: "helo"}
    const { setGeneratePasswdPrefs } = useContext(ProfilePrefsContext)
    const [openDialog, setOpenDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [AlertP, setAlertP] = useState({ show: false, text: ""});

    const PasswdField = useRef<HTMLInputElement>();
    const RePasswdField = useRef<HTMLInputElement>();
    const CurrentPassword = useRef<HTMLInputElement>();

    const passwordLen = useRef<HTMLInputElement>();

    const handleDelete = () => {
        axios.post(VHOST+"/api/profile/delete/account")
             .then(response => {
                setSnackBarStatus({open: true, message: "Account succesfully deleted.", severity: true});
                localStorage.clear();
            }, (error) => {
                setSnackBarStatus({open: true, message: "Something went wrong.", severity: false});
                console.warn("Delete account error:", error);
            });
    };

    const changePassword = () => {
        if (!PasswdField.current?.value || !RePasswdField.current?.value || !CurrentPassword.current?.value) {
            setAlertP({show: true, text: "Password fields cannot be empty!"});
            return;
        } else if (PasswdField.current?.value !== RePasswdField.current?.value) {
            setAlertP({show: true, text: "Password not match!"});
            return;
        } else {
            setAlertP({show: false, text: ""});
            axios.post(VHOST+"/api/profile/change/password", {
                oldPassword: CurrentPassword.current?.value,
                newPassword: PasswdField.current?.value
            }).then(response => {
                setSnackBarStatus({open: true, message: "Password successfully changed.", severity: true});
            }, (error) => {
                setSnackBarStatus({open: true, message: "Something went wrong.", severity: false});
                console.warn("Change password error:",error)
            })
        }
    };

    const saveGenPrefs = () => {
        if (!passwordLen.current?.value) {
            setSnackBarStatus({open: true, message: "Password length cannot be empty!", severity: false});
            return;
        };
        axios.post(VHOST+"/api/profile/editGenPrefs", {
            passwdlen: passwordLen.current?.value,
            symbols: checkedIS,
            numbers: checkedIN,
            lowercase: checkedILC,
            uppercase: checkedIUC
        }).then(response => {
            setSnackBarStatus({open: true, message: "Preferences successfully changed.", severity: true});
            setGeneratePasswdPrefs({upperChars: checkedIUC, lowerChars: checkedILC, numbers: checkedIN,
                                    symbols: checkedIS, pwdlen: passwordLen.current?.value})
        }, (error) => {
            console.warn("Profile preferences errror:", error);
        });
    };

    //? response handling snackbar
    const [snackBarStatus, setSnackBarStatus] = useState({open: false, message: "", severity: false});
    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarStatus({open: false, message: "", severity: false});
    };

    //? delete dialog
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    //? show password
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    //? check fields (abbreviated naming)
    const [checkedIS, setCheckedIS] = useState(false);
    const [checkedIN, setCheckedIN] = useState(false);
    const [checkedILC, setCheckedILC] = useState(false);
    const [checkedIUC, setCheckedIUC] = useState(false);

    const handleChangeIS = (e) => setCheckedIS(e.target.checked);
    const handleChangeIN = (e) => setCheckedIN(e.target.checked);
    const handleChangeILC = (e) => setCheckedILC(e.target.checked);
    const handleChangeIUC = (e) => setCheckedIUC(e.target.checked);

    return (
        <div className='App'>
            <div className="centerMe">
                <Typography variant="h3">
                    Profile Settings
                </Typography>
                <div style={{paddingLeft: "10px"}}>
                    <Avatar sx={{ bgcolor: "grey" }}>{user.username.substring(0,1)}</Avatar>
                </div>
            </div>
            <div className='CenterText'>
                <p>Customize your profile as you need</p>
            </div>
            <div className="giveMeSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>


            <Typography variant="h5" textAlign='center'>
                Password Generation Preference
            </Typography>
            <div className="giveMeSmallSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 600, width: "100%"}} />
            </div>
            <div className="centerMe">
                    <Container>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item  sx={{width: "100%", display: "flex"}} justifyContent="left" alignItems="left">
                                <TextField inputRef={passwordLen}  fullWidth label="Password Length:" helperText="We recommend at least 16 for safety." 
                                    type='number' variant='outlined' color='secondary'
                                    onInput = {(e) =>{
                                       (e.target as HTMLInputElement).value = Math.max(0, parseInt((e.target as HTMLInputElement).value) ).toString().slice(0,6);
                                    }} />
                            </Grid>
                            
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="space-between" alignItems="center" >
                            <div className='alignText'>
                                <Typography variant='subtitle1'>
                                    Include Symbols (@#$%!?):
                                </Typography>
                            </div>
                            <div className='alignBoxRight'>
                                <Checkbox
                                    
                                    checked={checkedIS}
                                    onChange={handleChangeIS}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                </div>
                            </Grid>
                            <Divider variant="middle" sx={{ width: "100%" }} />
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="space-between" alignItems="center">
                                <div className='alignText'>
                                    <Typography variant='subtitle1'>
                                        Include Numbers (0-9):
                                    </Typography>
                                </div>
                                <div className='alignBoxRight'>
                                    <Checkbox
                                        checked={checkedIN}
                                        onChange={handleChangeIN}
                                        color="secondary"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </Grid>
                            <Divider variant="middle" sx={{ width: "100%" }} />
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="space-between" alignItems="center">
                                <div className='alignText'>
                                    <Typography variant='subtitle1'>
                                        Include Lowercase Characters (abcdefghijklmnopqrstuvwxyz):
                                    </Typography>
                                </div>
                            
                                <div className='alignBoxRight'>
                                    <Checkbox
                                        checked={checkedILC}
                                        onChange={handleChangeILC}
                                        color="secondary"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </Grid>
                            <Divider variant="middle" sx={{ width: "100%" }} />
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="space-between" alignItems="center">
                                <div className='alignText'>
                                    <Typography variant='subtitle1'>
                                        Include Uppercase Characters (ABCDEFGHIJKLMNOPQRSTUVWXYZ):
                                    </Typography>
                                </div>
                                <div className='alignBoxRight'>
                                    <Checkbox
                                        checked={checkedIUC}
                                        onChange={handleChangeIUC}
                                        color="secondary"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                            </Grid>
                            <Divider variant="middle" sx={{ width: "100%"}} />
                        </Grid>
                    </Container>
            </div>

            {/*
                //? change password pref generation
                //? change password for user
                //? delete account 
                */}
            <div className="giveMeSpace centerMe">
                <Button sx={{maxWidth: 600, width: "100%"}} variant="contained" onClick={saveGenPrefs}>Save preferences</Button>
            </div>

            <div className='centerMe'>
                { (AlertP && AlertP.text && AlertP.show) && <Alert  sx={{ maxWidth: 800, width: "100%" }} severity="error">{AlertP.text}</Alert>}
            </div>
            <div className="giveMeSmallSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>
            
            <Typography textAlign='center' variant='h5'>
                Password Change
            </Typography>
            <div className="giveMeSmallSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>

            <Container>
                <TextField inputRef={CurrentPassword} margin="normal" type={showPassword ? "text" :  "password"} fullWidth label="Current Password:" variant='outlined' color='secondary'
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
                />

                <TextField inputRef={PasswdField} margin="dense" type={showPassword ? "text" :  "password"} fullWidth label="New Password:" variant='outlined' color='secondary' />
                <TextField inputRef={RePasswdField} margin="dense" type={showPassword ? "text" :  "password"} fullWidth label="Verify Password:" variant='outlined' color='secondary' />
            </Container>
            <div className="giveMeSpace centerMe">
                <Button sx={{maxWidth: 600, width: "100%"}} onClick={changePassword} variant="contained">Change Password</Button>
            </div>


            <div className="giveMeSmallSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>
            
            <Typography textAlign='center' variant='h5'>
                Delete Account
            </Typography>

            <div className="giveMeSmallSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>

            <div className="giveMeSmallSpace centerMe">
                <Button sx={{maxWidth: 400, width: "100%"}} onClick={handleOpenDialog} variant="outlined" color="error">
                  Delete Account
                </Button>
                <DialogDelete open={openDialog}
                    text="your account"
                    handleClose={handleCloseDialog} 
                    handleDelete={handleDelete} 
                />
            </div>
            <Container>
                <Snackbar open={snackBarStatus.open} autoHideDuration={4000} onClose={handleCloseSnacBar}>
                    <Alert onClose={handleCloseSnacBar} severity={snackBarStatus.severity ? "success" : "error"} sx={{ width: '100%' }}>
                        {snackBarStatus.message}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};

export default ProfileSettings;