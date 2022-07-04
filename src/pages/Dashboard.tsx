import PasswordCard from "../components/PasswordCard";
import NotesCard from "../components/NotesCard";
import DialogPass from "../components/DialogPass";
import { Pagination, Container, Button, 
    Divider, Stack, FormControl, InputLabel, 
    MenuItem, Select, Grid, Typography, Snackbar, Alert } from "@mui/material";
import "../scss/pages/dashboard.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VHOST } from "../vhost";
import { passwordsObj, notesObj } from "../types/global";

const Dashboard = () => {
    const [notes, setNotes] = useState<notesObj[]>([]);
    const [passwords, setPasswords] = useState<passwordsObj[]>([]);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("Passwords");

    //? response handling snackbar
    const [snackBarStatus, setSnackBarStatus] = useState({open: false, message: "", severity: false});
    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarStatus({open: false, message: "", severity: false});
    };

    const handleSavePass = (identifierValue: string, passValue: string, uuid: string, setOpenDialogPass: (boolean: boolean) => void) => {
        if (!passValue) {
            setSnackBarStatus({open: true, message: "Password cannot be empty!", severity: false});
            return;
        };
        axios.post(VHOST+"/api/vault/passwd-save/"+uuid, {
            identifier: identifierValue,
            content: passValue
        })
             .then(response => {
                setOpenDialogPass(false);
                passwords.unshift(response.data.newCard);
                setPasswords(passwords);
                setSnackBarStatus({open: true, message: "Password was saved sucessfully!", severity: true});
             }, (error) => {
                console.log(error)
                setSnackBarStatus({open: true, message: "Something went wrong!", severity: false});
             });
    };

    const handleDeletePass = (id: string, setOpenDialogDel: (boolean: boolean) => void) => {
        axios.post(VHOST+"/api/vault/passwd-delete/"+id)
             .then(response => {
                setOpenDialogDel(false);
                setPasswords(passwords.filter(password => password.id !== id));
                setSnackBarStatus({open: true, message: "Succesfully deleted", severity: true});
            }, (error) => {
                console.log(error)
            });
    };

    //? Dialog handlers for password gen
    const handleClickOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    //? Filter value
    const handleChange = event => setFilter(event.target.value);

    //? use of modulo
    const colorName = ["aqua", "blue", "green", "lime", "maroon", "navy", "olive",
    "purple", "red", "silver", "teal", "white", "yellow"]
    useEffect(() => {
        axios.all([
          axios.post(VHOST+"/api/vault/getPasswords"), 
          axios.post(VHOST+"/api/vault/getNotes")
        ])
        .then(axios.spread((response1, response2) => {
          setPasswords(response1.data.response.reverse());
          setNotes(response2.data.response.reverse());
        })).catch(e => {
            console.log(e);
        });
    }, []);

    //? Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const [passwordsPerPage] = React.useState(6);

    const indexOfLastPassword = currentPage * passwordsPerPage;
    const indexOfFirstPassword = indexOfLastPassword - passwordsPerPage;
    let currentPasswords;
    let numberOfPages : number = 1;
    if ( passwords.length ){
      currentPasswords = passwords.slice(indexOfFirstPassword, indexOfLastPassword);
      numberOfPages = Math.ceil(passwords.length / passwordsPerPage);
    }
    const PaginatePass = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="App">
            <div className="DashboardMain">
                <div className="DashboardText">
                    <Typography variant="h3">Welcome!</Typography>
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
                      open={open}
                      handleClose={handleCloseDialog}
                      handleSavePass={handleSavePass}
                      setOpenDialogPass={setOpen}
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
                                {/* <MenuItem value={"Everything"}>Everything</MenuItem> */}
                                <MenuItem value={"Passwords"}>Passwords</MenuItem>
                                <MenuItem value={"Notes"}>Notes</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Container>

                <Container>
                    {/* //? Starting of passwords  */}
                    {currentPasswords ? 
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
                            {currentPasswords.map((password, index) => (
                                <Grid key={index} item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                    <PasswordCard handleSavePass={handleSavePass} handleDelete={handleDeletePass}
                                    password={{ title: password.name, subheader: "Sub", id: password.id, identifier: password.name, pswd: password.content }} 
                                    AvatarColor={colorName[index % colorName.length]} />
                                </Grid>
                            ))}
                        </Grid>

                        { (numberOfPages > 1) && <div className="giveMeSpace centerMe">
                            <Pagination count={numberOfPages} color="primary" onChange={PaginatePass} showFirstButton showLastButton />
                        </div>}
                    </div>
                    : <div></div>}

                    {/* //? Starting of notes  */}
                    {notes.length ?
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
                            {notes.map((note, index) => (
                                <Grid key={index} item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                    <NotesCard note={{ title: note.name, subheader: "Sub", color: colorName[index % colorName.length], id: note.id }} />
                                </Grid>
                            ))}
                        </Grid>
                        <div className="giveMeSpace centerMe">
                            <Pagination count={10} color="primary" showFirstButton showLastButton />
                        </div>
                    </div>
                    : <div></div>}
                    {(notes.length || passwords.length) ? 
                    <div></div> :
                    <div className="giveMeSpace">
                        <Typography variant="h4" textAlign={"center"}>
                            It's empty here, fill the space.
                        </Typography>
                        
                    </div> }
                    
                    {/*//? response handling  */}
                    <Snackbar open={snackBarStatus.open} autoHideDuration={4000} onClose={handleCloseSnacBar}>
                        <Alert onClose={handleCloseSnacBar} severity={snackBarStatus.severity ? "success" : "error"} sx={{ width: '100%' }}>
                            {snackBarStatus.message}
                        </Alert>
                    </Snackbar>
                </Container>
            </div>

        </div>
    );
};


export default Dashboard;