import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { MasterPasswordContext } from "../components/Store/Store";
import { VHOST } from "../vhost";
import { passwordsObj, notesObj } from "../types/global";

import PasswordCard from "../components/PasswordCard";
import NotesCard from "../components/NotesCard";
import DialogPass from "../components/DialogPass";
import "../scss/pages/dashboard.scss";

import { Pagination, Container, Button, 
    Divider, Stack, FormControl, InputLabel, 
    MenuItem, Select, Grid, Typography, Snackbar, Alert } from "@mui/material";

import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const Dashboard = () => {
    const [notes, setNotes] = useState<notesObj[]>([]);
    const [passwords, setPasswords] = useState<passwordsObj[]>([]);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState("Passwords");
    const {masterpass, setMasterPass} = useContext(MasterPasswordContext);

    //? response handling snackbar
    const [snackBarStatus, setSnackBarStatus] = useState({open: false, message: "", severity: false});
    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackBarStatus({open: false, message: "", severity: false});
    };

    //? Master Password
    let RouterLocation = useLocation();
    let navigation = useNavigate();
    useEffect(() => {
        if (!masterpass) {
            if (RouterLocation.state) {
                if ((RouterLocation.state as { masterpass: string }).masterpass) {
                    setMasterPass((RouterLocation.state as { masterpass: string }).masterpass);
                    return;
                };
                return;
            };
            navigation("/setMasterPass");
        };
    }, [RouterLocation.state, masterpass, navigation]);

    //? functions decode / encode
    const encryptAES = (string: string) => {
        let encryptedObj = AES.encrypt(string, masterpass);
        return encryptedObj.toString();
    };
    const decryptAES = (encrypted: string) => {
        let decryptedObj = AES.decrypt(encrypted, masterpass);
        return decryptedObj.toString(Utf8);
    };

    //? passwords api 
    const handleSavePass = (identifierValue: string, passValue: string, uuid: string, setOpenDialogPass: (boolean: boolean) => void) => {
        if (!passValue) {
            setSnackBarStatus({open: true, message: "Password cannot be empty!", severity: false});
            return;
        };
        if (!masterpass) {
            setSnackBarStatus({open: false, message: "Master Password cannot be empty!", severity: false});
            navigation("/setMasterPass");
            return;
        };

        let EncryptedIdentifierValue = encryptAES(identifierValue);
        let EncryptedPassValue = encryptAES(passValue);
        axios.post(VHOST+"/api/vault/passwd-save/"+uuid, {
            identifier: EncryptedIdentifierValue,
            content: EncryptedPassValue
        })
             .then(response => {
                setOpenDialogPass(false);
                if (uuid === "null") {
                    passwords.unshift(response.data.newCard);
                } else {
                    //? get object with id == uuid and change properties content and identifier
                    for (let i=0; i<passwords.length; i++) {
                        if (passwords[i].id === uuid) {
                            passwords[i].name = identifierValue;
                            passwords[i].content = passValue;
                            break;
                        };
                    };
                };
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
                setSnackBarStatus({open: true, message: "Password succesfully deleted", severity: true});
            }, (error) => {
                console.warn("Password delete error:", error);
            });
    };

    //? notes api
    const handleDeleteNote = (id: string, setOpenDialogDel: (boolean: boolean) => void) => {
        axios.post(VHOST+"/api/vault/note-delete/"+id)
             .then(response => {
                setOpenDialogDel(false);
                setNotes(notes.filter(note => note.id !== id));
                setSnackBarStatus({open: true, message: "Note succesfully deleted", severity: true});
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

    //? Generating passwords
    const [generatePasswdState, setGeneratePasswdState] = useState({
        upperChars: true, lowerChars: true, numbers: true, symbols: true, pwdlen: 24
    })
    useEffect(() => {
        axios.post(VHOST+"/api/profile/getProfilePrefs")
             .then(response => {
                let res = response.data.response.passwordPrefs
                setGeneratePasswdState({upperChars: res.uppercase, lowerChars: res.lowercase,
                                        numbers: res.numbers, symbols: res.symbols, pwdlen: res.passwdlen });
             }, (error) => {
                console.warn("Profile prefs error: ", error);
             });
    }, []);

    const GenerateRandomPass = (setPassValue: (string: string) => void) => {
        let UpperChars = generatePasswdState.upperChars ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
        let LowerChars = generatePasswdState.lowerChars ? "abcdefghijklmnopqrstuvwxyz" : "";
        let numbers = generatePasswdState.numbers ? "0123456789" : "";
        let symbols = generatePasswdState.symbols ? "@#$%!?§~" : "";
        let everything = UpperChars + LowerChars + numbers + symbols;
        let pwdLen = generatePasswdState.pwdlen;
        let randomstring = Array(pwdLen).fill(everything).map((x) => { return x[Math.floor(Math.random() * x.length)] }).join('');
        setPassValue(randomstring);
    };

    //? Pagination Passwords
    const [currentPage, setCurrentPage] = React.useState(1);
    const [passwordsPerPage] = React.useState(6);

    const indexOfLastPassword = currentPage * passwordsPerPage;
    const indexOfFirstPassword = indexOfLastPassword - passwordsPerPage;
    let currentPasswords;
    let numberOfPages : number = 1;
    if ( passwords.length ) {
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
    let numberOfPagesNotes : number = 1;
    if ( notes.length ) {
      currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
      numberOfPagesNotes = Math.ceil(notes.length / notesPerPage);
    };

    const PaginateNotes = (event: React.ChangeEvent<unknown>, page: number) => setCurrentPageOfNotes(page);

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
                            {currentPasswords.map((password: passwordsObj, index: number) => (
                                <Grid key={index} item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                    <PasswordCard decryptAES={decryptAES} handleSavePass={handleSavePass} handleDelete={handleDeletePass}
                                    password={password} AvatarColor={colorName[index % colorName.length]} GenerateRandomPass={GenerateRandomPass}/>
                                </Grid>
                            ))}
                        </Grid>

                        { (numberOfPages > 1) && <div className="giveMeSpace centerMe">
                            <Pagination count={numberOfPages} color="primary" onChange={PaginatePass} showFirstButton showLastButton />
                        </div>}
                    </div>
                    : <div></div>}

                    {/* //? Starting of notes  */}
                    {currentNotes ?
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
                            {currentNotes.map((note, index) => (
                                <Grid key={index} item sx={{width: "100%", display: "flex"}} justifyContent="center" alignItems="center" >
                                    <NotesCard handleDelete={handleDeleteNote} note={{ title: note.name, subheader: "Sub", content: note.content, id: note.id }} />
                                </Grid>
                            ))}
                        </Grid>
                        { (numberOfPagesNotes > 1) && <div className="giveMeSpace centerMe">
                            <Pagination count={numberOfPagesNotes} color="primary" onChange={PaginateNotes} showFirstButton showLastButton />
                        </div>}
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