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
                            <Box>
                                <Button sx={{ width: 250 }} onClick={handleClickOpenDialog} variant="contained">
                                    Create a password
                                </Button>
                                <DialogPass
                                  identifierContent={""}
                                  PasswdContent={""}
                                  open={open}
                                  handleClose={handleCloseDialog}
                                />
                            </Box>
                            <Box>
                                <Button sx={{ width: 250 }} href='/create/notes' variant="contained">
                                    Create a note
                                </Button>
                            </Box>
                        </Stack>
                    </Container>
                </div>
                <div className="giveMeSpace centerMe">
                    <Divider variant="middle" sx={{width: 800}} />
                </div>
                <Container>
                    <div className="centerMe">
                        <FormControl sx={{width: 600}}>
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
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            <div className="giveMeSpace" style={{textAlign: "center"}}>
                                <Typography variant="h4">
                                    Passwords
                                </Typography>
                                <Divider variant="middle" sx={{width: 400}} />
                            </div>
                            {/* //! map Loop */}
                            <Grid item >
                                <PasswordCard password={{ title: "he", subheader: "Sub", link: "/", color: "red", id: 1, pswd: "HELLO", identifier: "HELLO" }} />
                            </Grid>
                            <Grid item >
                                <PasswordCard password={{ title: "he", subheader: "Sub", link: "/", color: "blue", id: 2, pswd: "HEL" }} />
                            </Grid>
                        </Grid>

                        <div className="giveMeSpace centerMe">
                            <Pagination count={10} color="primary" />
                        </div>
                    </div>

                    <div className={filter === "Passwords" ? 'hidden' : undefined}>
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            <div className="giveMeSpace" style={{textAlign: "center"}}>
                                <Typography variant="h4">
                                    Notes
                                </Typography>
                                <Divider variant="middle" sx={{width: 400}} />
                            </div>
                            {/* //! map Loop */}
                            <Grid item >
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