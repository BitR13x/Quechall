import NavbarComponent from "../components/header/navbar";
import CirclesAnimation from "../components/animation/circles";
import NotesCard from "../components/NotesCard";
import DialogPass from "../components/DialogPass";
import { Pagination, Container, Button, 
    Divider, Stack, FormControl, InputLabel, 
    MenuItem, Select, Grid, Box } from "@mui/material";
import VerticalNavbar from "./header/verticalnavbar";
import "../scss/pages/dashboard.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [passwords, setPasswords] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState("Everything");

    const handleClickOpenDialog = () => {
        setOpen(true);
      };
    
    const handleCloseDialog = (value: string) => {
      setOpen(false);
    };
    //? use of modulo
    //? const colorName = ["aqua", "blue", "green", "lime", "maroon", "navy", "olive",
    //? "purple", "red", "silver", "teal", "white", "yellow"]
    // useEffect(() => {
    //     axios.post("/notes")
    //     axios.post("/passwords")
    // }, []);

    const handleChange = event => {
        setFilter(event.target.value);
    }
    return (
        <div className="App">
            <NavbarComponent/>
            <div className="DashboardMain">
                <div className="DashboardText">
                    <h1>Dashboard</h1>
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
                                  open={open}
                                  handleClose={handleCloseDialog}
                                />
                            </Box>
                            <Box>
                                <Button sx={{ width: 250 }} variant="contained">Create a note</Button>
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
                            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                    <div className="giveMeSpace">
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item >
                                <NotesCard note={{ title: "he", subheader: "Sub", link: "/", color: "red", id: 1 }} />
                            </Grid>
                            <Grid item >
                                <NotesCard note={{ title: "he", subheader: "Sub", link: "/", color: "blue", id: 2 }} />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <div className="giveMeSpace centerMe">
                <Pagination count={10} color="primary" />
            </div>
            <VerticalNavbar/>
            <CirclesAnimation/>
        </div>
    );
};


export default Dashboard;