import { Grid, Container, Typography, Button, 
    Divider, Avatar, TextField, Checkbox,
    InputAdornment, IconButton, Alert } from '@mui/material';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState, useRef } from 'react';
import axios from 'axios';
import DialogDelete from '../../components/DialogDelete';
import "../../scss/pages/profileSettings.scss";

const ProfileSettings = () => {
    interface alertP {
        show: boolean,
        text: string
    }
    var user = {username: "helo"}
    const [openDialog, setOpenDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [AlertP, setAlertP] = useState<alertP>();

    const PasswdField = useRef<HTMLInputElement>();
    const RePasswdField = useRef<HTMLInputElement>();
    const CurrentPassword = useRef<HTMLInputElement>();
    
    const handleDelete = () => {
        axios.post("/delete/account")
             .then(response => console.log(response))
    };

    const changePassword = () => {
        if (!PasswdField.current?.value || !RePasswdField.current?.value || !CurrentPassword.current?.value) {
            setAlertP({show: true, text: "Password fields cannot be empty!"});
            return;
        } else if (PasswdField.current?.value === RePasswdField.current?.value) {
            setAlertP({show: true, text: "Password not match!"});
            return;
        } else {
            setAlertP({show: false, text: ""});
            axios.post("/change/password")
        }
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
            <Container>
                <div className="alertContainer">
{/*                     { (alert && alert.severity && alert.message) &&
                    // @ts-ignore
                    <Alert sx={{ width: 600 }} severity={alert.severity}>{alert.message}</Alert>} */}
                </div>
            </Container>
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
                                <TextField fullWidth label="Password Length:" helperText="We recommend at least 16 for safety." type='number' variant='outlined' color='secondary' />
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
                <Button sx={{maxWidth: 600, width: "100%"}} variant="contained">Save preferences</Button>
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
        </div>
    );
};

export default ProfileSettings;