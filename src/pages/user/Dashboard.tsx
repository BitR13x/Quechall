import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MasterPasswordContext, StoreFetchContext, ProfilePrefsContext } from "../../components/Store/Store";
import { VHOST } from "../../vhost";
import { passwordsObj, notesObj } from "../../types/global";

import PasswordCard from "../../components/Cards/PasswordCard";
import NotesCard from "../../components/Cards/NotesCard";
import DialogPass from "../../components/Dialogs/Pass";
import StackBarResponseHandling from "../../components/StackBarResponseHandling";
import { decryptAES, encryptAES } from "../../encryption";
import "../../scss/pages/dashboard.scss";

import {
    Pagination, Container, Button,
    Divider, Stack, FormControl, InputLabel,
    MenuItem, Select, Grid, Typography, TextField,
    InputAdornment
} from "@mui/material";

import { Search } from '@mui/icons-material';

const Dashboard = () => {
    interface StoreFetchContextTypes { notes: notesObj[], setNotes: any, passwords: passwordsObj[], setPasswords: any };
    const { notes, setNotes, passwords, setPasswords } = useContext<StoreFetchContextTypes>(StoreFetchContext);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("Passwords");
    const { masterpass } = useContext(MasterPasswordContext);
    //? SearchBar
    const [query, setQuery] = useState("");
    //? response handling snackbar
    const [snackBarStatus, setSnackBarStatus] = useState({ open: false, message: "", severity: false });

    //? Master Password
    let navigation = useNavigate();
    useEffect(() => {
        if (!masterpass) {
            document.location.replace("/setMasterPass")
        };
    }, [masterpass]);

    //? passwords api 
    const handleSavePass = (identifierValue: string, passValue: string, uuid: string, setOpenDialogPass: (boolean: boolean) => void) => {
        if (!passValue) {
            setSnackBarStatus({ open: true, message: "Password cannot be empty!", severity: false });
            return;
        };
        if (!masterpass) {
            setSnackBarStatus({ open: false, message: "Master Password cannot be empty!", severity: false });
            navigation("/setMasterPass");
            return;
        };

        let EncryptedIdentifierValue = encryptAES(identifierValue, masterpass);
        let EncryptedPassValue = encryptAES(passValue, masterpass);
        axios.post(VHOST + "/api/vault/passwd-save/" + uuid, {
            identifier: EncryptedIdentifierValue,
            content: EncryptedPassValue
        })
            .then(response => {
                setOpenDialogPass(false);
                if (uuid === "null") {
                    passwords.unshift({
                        name: identifierValue, content: passValue,
                        OwnerId: response.data.newCard.OwnerId, id: response.data.newCard.id,
                        createdAt: response.data.newCard.createdAt
                    });
                } else {
                    //? get object with id == uuid and change properties content and identifier
                    for (let i = 0; i < passwords.length; i++) {
                        if (passwords[i].id === uuid) {
                            passwords[i].name = identifierValue;
                            passwords[i].content = passValue;
                            break;
                        };
                    };
                };
                setPasswords(passwords);
                setSnackBarStatus({ open: true, message: "Password was saved sucessfully!", severity: true });
            }, (error) => {
                console.log(error)
                setSnackBarStatus({ open: true, message: "Something went wrong!", severity: false });
            });
    };

    const handleDeletePass = (id: string, setOpenDialogDel: (boolean: boolean) => void) => {
        axios.post(VHOST + "/api/vault/passwd-delete/" + id)
            .then(response => {
                setOpenDialogDel(false);
                setPasswords(passwords.filter(password => password.id !== id));
                setSnackBarStatus({ open: true, message: "Password succesfully deleted", severity: true });
            }, (error) => {
                console.warn("Password delete error:", error);
            });
    };

    //? notes api
    const handleDeleteNote = (id: string, setOpenDialogDel: (boolean: boolean) => void) => {
        axios.post(VHOST + "/api/vault/note-delete/" + id)
            .then(response => {
                setOpenDialogDel(false);
                setNotes(notes.filter(note => note.id !== id));
                setSnackBarStatus({ open: true, message: "Note succesfully deleted", severity: true });
            }, (error) => {
                console.warn("Note delete error:", error);
            });
    };

    //? Dialog handlers for password gen
    const handleClickOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    //? Filter value
    const handleChange = event => setFilter(event.target.value);

    const colorName = ["aqua", "blue", "green", "lime", "maroon", "navy", "olive",
        "purple", "red", "silver", "teal", "white", "yellow"];
    useEffect(() => {
        if (passwords.length || notes.length) {
            return;
        } else {
            axios.all([
                axios.post(VHOST + "/api/vault/getPasswords"),
                axios.post(VHOST + "/api/vault/getNotes")
            ])
                .then(axios.spread((response1, response2) => {
                    let decodedIdentifier: string;
                    for (let i = 0; i < response1.data.response.length; i++) {
                        decodedIdentifier = decryptAES(response1.data.response[i].name, masterpass);
                        if (decodedIdentifier) {
                            response1.data.response[i].name = decodedIdentifier;
                        }
                    };
                    for (let i = 0; i < response2.data.response.length; i++) {
                        decodedIdentifier = decryptAES(response2.data.response[i].name, masterpass);
                        if (decodedIdentifier) {
                            response2.data.response[i].name = decodedIdentifier;
                        }
                    };

                    setPasswords(response1.data.response.reverse());
                    setNotes(response2.data.response.reverse());
                })).catch(e => {
                    console.log(e);
                });
        }
    }, [notes.length, passwords.length, setNotes, setPasswords, masterpass]);
    //? Generating passwords
    const { generatePasswdPrefs, setGeneratePasswdPrefs } = useContext(ProfilePrefsContext);
    useEffect(() => {
        if (!generatePasswdPrefs.isUpdated) {
            axios.post(VHOST + "/api/profile/getProfilePrefs")
                .then(response => {
                    let res = response.data.response.passwordPrefs;
                    setGeneratePasswdPrefs({
                        upperChars: res.uppercase, lowerChars: res.lowercase,
                        numbers: res.numbers, symbols: res.symbols, pwdlen: res.passwdlen, isUpdated: true
                    });
                }, (error) => {
                    console.warn("Profile prefs error: ", error);
                });
        }
    }, [generatePasswdPrefs, setGeneratePasswdPrefs]);

    const GenerateRandomPass = (setPassValue: (string: string) => void) => {
        let UpperChars = generatePasswdPrefs.upperChars ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
        let LowerChars = generatePasswdPrefs.lowerChars ? "abcdefghijklmnopqrstuvwxyz" : "";
        let numbers = generatePasswdPrefs.numbers ? "0123456789" : "";
        let symbols = generatePasswdPrefs.symbols ? "@#$%!?§~" : "";
        let everything = UpperChars + LowerChars + numbers + symbols;
        let pwdLen = generatePasswdPrefs.pwdlen;
        let randomstring = Array(pwdLen).fill(everything).map((x) => { return x[Math.floor(Math.random() * x.length)] }).join('');
        setPassValue(randomstring);
    };

    //? Pagination Passwords
    const [currentPage, setCurrentPage] = React.useState(1);
    const [passwordsPerPage] = React.useState(6);

    const indexOfLastPassword = currentPage * passwordsPerPage;
    const indexOfFirstPassword = indexOfLastPassword - passwordsPerPage;
    let currentPasswords;
    let numberOfPages: number = 1;
    if (passwords.length) {
        currentPasswords = passwords.slice(indexOfFirstPassword, indexOfLastPassword);
        numberOfPages = Math.ceil(passwords.length / passwordsPerPage);
    };
    const PaginatePass = (event: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page);

    //? Pagination Notes
    const [currentPageOfNotes, setCurrentPageOfNotes] = React.useState(1);
    const [notesPerPage] = React.useState(6);

    const indexOfLastNote = currentPageOfNotes * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    let currentNotes;
    let numberOfPagesNotes: number = 1;
    if (notes.length) {
        currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
        numberOfPagesNotes = Math.ceil(notes.length / notesPerPage);
    };
    const PaginateNotes = (event: React.ChangeEvent<unknown>, page: number) => setCurrentPageOfNotes(page);
    return (
        <div className="App">
            <div className="DashboardMain">
                <div className="DashboardText">
                    <Typography fontFamily='"Courier New", Courier, monospace' variant="h2">Welcome!</Typography>
                    <p>Create your own secure password or note</p>
                </div>
                <div style={{ paddingTop: "7vh" }}>
                    <Container>
                        <Stack direction="row" spacing={2}
                            divider={<Divider orientation="vertical" flexItem />}
                            alignItems="center" justifyContent="center">
                            <Button sx={{ width: 250 }} onClick={handleClickOpenDialog} variant="contained">
                                Create a password
                            </Button>

                            <Button sx={{ width: 250 }} onClick={() => navigation("/create/notes")} variant="contained">
                                Create a note
                            </Button>
                        </Stack>
                    </Container>
                    <DialogPass
                        open={open}
                        handleClose={handleCloseDialog}
                        handleSavePass={handleSavePass}
                        setOpenDialogPass={setOpen}
                        GenerateRandomPass={GenerateRandomPass}
                    />
                </div>
                <div className="giveMeSpace centerMe">
                    <Divider variant="middle" sx={{ maxWidth: 800, width: "100%" }} />
                </div>
                <Container>
                    <div className="centerMe">
                        <FormControl sx={{ maxWidth: 600, width: "100%" }}>
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
                    {/* //? title of the Vault */}
                    <div style={{ textAlign: "center", marginTop: "5vh" }}>
                        {/* //? here could be that filter directly (but could introduce security hole) */}
                        {filter === "Passwords" ?
                            <Typography fontFamily='"Courier New", Courier, monospace' variant="h4">
                                Passwords
                            </Typography> :
                            <Typography fontFamily='"Courier New", Courier, monospace' variant="h4">
                                Notes
                            </Typography>
                        }
                        <div className="centerMe">
                            <Divider variant="middle" sx={{ maxWidth: 400, width: "100%" }} />
                        </div>
                    </div>
                    {/* //? searchbar */}
                    <div className="centerMe">
                        <TextField fullWidth color="secondary" label="Search..." sx={{ maxWidth: 600, width: "100%" }}
                            onChange={event => setQuery(event.target.value)} variant="filled" margin="dense" InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                )
                            }} />
                    </div>

                    {query && filter === "Passwords" && passwords.filter(password =>
                        password.name.toLowerCase().includes(query.toLowerCase())
                    ).map((password: passwordsObj, index: number) => (
                        <Grid key={password.id} item sx={{ width: "100%", display: "flex" }} justifyContent="center" alignItems="center" >
                            <PasswordCard decryptAES={decryptAES} handleSavePass={handleSavePass} handleDelete={handleDeletePass} masterpass={masterpass}
                                password={password} AvatarColor={colorName[index % colorName.length]} GenerateRandomPass={GenerateRandomPass} />
                        </Grid>
                    ))}

                    {query && filter === "Notes" && notes.filter(note =>
                        note.name.toLowerCase().includes(query.toLowerCase())
                    ).map((note: notesObj) => (
                        <Grid key={note.id} item sx={{ width: "100%", display: "flex" }} justifyContent="center" alignItems="center" >
                            <NotesCard handleDelete={handleDeleteNote} note={note} />
                        </Grid>
                    ))}

                    {/* //? Starting of passwords  */}
                    {(currentPasswords && filter === "Passwords" && !query) ?
                        <div className="giveMeSpace">
                            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                                {currentPasswords.map((password: passwordsObj, index: number) => (
                                    <Grid key={password.id} item sx={{ width: "100%", display: "flex" }} justifyContent="center" alignItems="center" >
                                        <PasswordCard decryptAES={decryptAES} handleSavePass={handleSavePass} handleDelete={handleDeletePass} masterpass={masterpass}
                                            password={password} AvatarColor={colorName[index % colorName.length]} GenerateRandomPass={GenerateRandomPass} />
                                    </Grid>
                                ))}
                            </Grid>

                            {(numberOfPages > 1) && <div className="giveMeSpace centerMe">
                                <Pagination count={numberOfPages} color="primary" onChange={PaginatePass} showFirstButton showLastButton />
                            </div>}
                        </div> : <div></div>}

                    {/* //? Starting of notes  */}
                    {(currentNotes && filter === "Notes" && !query) ?
                        <div className="giveMeSpace">
                            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                                {currentNotes.map((note: notesObj) => (
                                    <Grid key={note.id} item sx={{ width: "100%", display: "flex" }} justifyContent="center" alignItems="center" >
                                        <NotesCard handleDelete={handleDeleteNote} note={note} />
                                    </Grid>
                                ))}
                            </Grid>
                            {(numberOfPagesNotes > 1) && <div className="giveMeSpace centerMe">
                                <Pagination count={numberOfPagesNotes} color="primary" onChange={PaginateNotes} showFirstButton showLastButton />
                            </div>}
                        </div>
                        : <div></div>}

                    {!notes.length && !passwords.length ?
                        <div className="giveMeSpace">
                            <Typography variant="h4" textAlign={"center"}>
                                It's empty here, fill the space.
                            </Typography>
                        </div> : <div></div>}
                    {/*//? response handling  */}
                    <StackBarResponseHandling
                        setSnackBarStatus={setSnackBarStatus}
                        snackBarStatus={snackBarStatus}
                    />
                </Container>
            </div>

        </div>
    );
};


export default Dashboard;