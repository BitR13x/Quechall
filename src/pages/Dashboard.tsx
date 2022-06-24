import PasswordCard from "../components/PasswordCard";
import NotesCard from "../components/NotesCard";
import DialogPass from "../components/DialogPass";
import { Pagination, Container, Button, 
    Divider, Stack, FormControl, InputLabel, 
    MenuItem, Select, Grid, Box, Typography } from "@mui/material";
import "../scss/pages/dashboard.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [passwords, setPasswords] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState("Everything");

    //? Dialog handlers for password gen
    const handleClickOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);
    //? Filter value
    const handleChange = event => setFilter(event.target.value);

    //? use of modulo
    //? const colorName = ["aqua", "blue", "green", "lime", "maroon", "navy", "olive",
    //? "purple", "red", "silver", "teal", "white", "yellow"]
    // useEffect(() => {
    //     axios.post("/notes")
    //     axios.post("/passwords")
    // }, []);


    return (
        <div className="App">
            <div className="DashboardMain">
                <div className="DashboardText">
                    <Typography variant="h3">Dashboard</Typography>
                    <p>Create your highly secure password or note</p>
                </div>
                <div style={{ paddingTop: "7vh" }}>
                    <Container>
                        <Stack direction="row" spacing={2}
                        divider={<Divider orientation="vertical" flexItem />} 
                        alignItems="center" justifyContent="center">
                            <Button sx={{ width: 250 }} onClick={handleClickOpenDialog} variant="contained">
                                Create a password
                            </Button>

                            <Button sx={{ width: 250 }} href='/create/notes' variant="contained">
                                Create a note
                            </Button>
                        </Stack>
                    </Container>
                    <DialogPass
                      identifierContent={""}
                      PasswdContent={""}
                      open={open}
                      handleClose={handleCloseDialog}
                    />
                </div>
                <div className="giveMeSpace centerMe">
                    <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
                </div>
                <Container>
                    <div className="centerMe">
                        <FormControl sx={{maxWidth: 600, width: "100%"}}>
                            <InputLabel>Filter</InputLabel>
                            <Select
                                value={filter}
                                label="Filter"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Everything"}>Everything</MenuItem>
                                <MenuItem value={"Passwords"}>Passwords</MenuItem>
                                <MenuItem value={"Notes"}>Notes</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Container>

                <Container>
                    <div className={filter === "Notes" ? 'hidden' : undefined}>
                        <div className="giveMeSpace" style={{textAlign: "center"}}>
                            <Typography variant="h4">
                                Passwords
                            </Typography>
                            <div className="centerMe">
                                <Divider variant="middle" sx={{maxWidth: 400, width: "100%"}} />
                            </div>
                        </div>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            {/* //! map Loop */}
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                <PasswordCard password={{ title: "he", subheader: "Sub", link: "/", color: "red", id: 1, pswd: "HELLO", identifier: "HELLO" }} />
                            </Grid>
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                <PasswordCard password={{ title: "he", subheader: "Sub", link: "/", color: "blue", id: 2, pswd: "HEL" }} />
                            </Grid>
                        </Grid>

                        <div className="giveMeSpace centerMe">
                            <Pagination count={10} color="primary" />
                        </div>
                    </div>

                    <div className={filter === "Passwords" ? 'hidden' : undefined}>
                        <div className="giveMeSpace" style={{textAlign: "center"}}>
                            <Typography variant="h4">
                                Notes
                            </Typography>
                            <div className="centerMe">
                                <Divider variant="middle" sx={{maxWidth: 400, width: "100%"}} />
                            </div>
                        </div>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>

                            {/* //! map Loop */}
                            <Grid item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                <NotesCard note={{ title: "he", subheader: "Sub", link: "/", color: "blue", id: 2 }} />
                            </Grid>
                        </Grid>
                        <div className="giveMeSpace centerMe">
                            <Pagination count={10} color="primary" />
                        </div>
                    </div>

                </Container>
            </div>

        </div>
    );
};


export default Dashboard;