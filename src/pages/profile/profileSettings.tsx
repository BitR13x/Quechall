import { Grid, Container, Typography, Button, 
    Divider, Avatar, TextField, Checkbox } from '@mui/material';
import { useState } from 'react';
import "../../scss/pages/profileSettings.scss";

const ProfileSettings = () => {
    var user = {username: "helo"}

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
                <Divider variant="middle" sx={{width: 800}} />
            </div>

            <div className="">
                <div className='PassGeneratorPref'>
                    
                        
                        <Grid container direction="column" justifyContent="left" alignItems="left" spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Password Length:" type='number' variant='outlined' color='secondary' />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={3}>
                            <p>Include Symbols:</p>
                            <div className='alignBox'>
                                <Checkbox
                                    
                                    checked={checkedIS}
                                    onChange={handleChangeIS}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                </div>
                            </Grid>
                            <Divider variant="middle" sx={{width: 600}} />
                            <Grid item xs={12} sm={6} md={3}>
                            <p>Include Numbers:</p>
                                <Checkbox
                                    checked={checkedIN}
                                    onChange={handleChangeIN}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Divider variant="middle" sx={{width: 600}} />
                            <Grid item xs={12} sm={6} md={3}>
                            <p>Include Lowercase Characters:</p>
                                <Checkbox
                                    checked={checkedILC}
                                    onChange={handleChangeILC}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Divider variant="middle" sx={{width: 600}} />
                            <Grid item xs={12} sm={6} md={3}>
                            <p>Include Uppercase Characters:</p>
                                <Checkbox
                                    checked={checkedIUC}
                                    onChange={handleChangeIUC}
                                    color="secondary"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                            <Divider variant="middle" sx={{width: 600}} />
                        </Grid>
                </div>
            </div>

            {/*
                //? change password pref generation
                //? change password for user
                //? delete account 
                */}
            <div className="giveMeSpace centerMe">
                <Button sx={{ width: 600 }} variant="contained">Save preferences</Button>
            </div>
        </div>
    );
}

export default ProfileSettings;