import React, { useState, useContext, useEffect } from "react";
import Markdown from "../components/Markdown";
import MarkdownSyntax from "../components/MarkdownSyntax";
import { Container, Button, Stack, Divider, Switch, 
    FormControlLabel, Box, TextField, Snackbar, Alert, 
    Tooltip, IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MasterPasswordContext } from "../components/Store/Store";
import { decryptAES, encryptAES } from "../encryption";

const Notes = ({ NoteTitle = "", markdownDef = "", uuid="null" }) => {
    const { masterpass } = useContext(MasterPasswordContext);
    interface StateObj {
        NoteTitle: string,
        markdownDef: string,
        uuid: string,
    };
    let RouterLocation = useLocation()
    if (RouterLocation.state) {
        ({ NoteTitle, markdownDef, uuid } = RouterLocation.state as StateObj);
    };
    const [markdown, setMarkdown] = useState(markdownDef);
    const [display, setDisplay] = useState("Editor");
    const [checked, setChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = React.useState({open: false, message: "", severity: false});
    let NoteTitleField = React.useRef<HTMLInputElement>();
    
    let navigation = useNavigate();
    useEffect(() => {
        if (!masterpass) {
            navigation("/setMasterPass");
            return;
        };
        if (markdownDef) {
            let decryptedContent : string = decryptAES(markdownDef, masterpass);
            if (decryptedContent) {
                setMarkdown(decryptedContent);
            };
        };
    }, [masterpass, markdownDef, navigation]);

    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setSnackBarStatus({open: false, message: "", severity: false});
    };
    const handleChangeSwitch = () => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        };
    };
    
    const saveNote = () => {
        if (!NoteTitleField.current || !NoteTitleField.current.value || !markdown) {
            setShowAlert(true);
            return;
        } else {
            if (showAlert) {
                setShowAlert(false);
            };
            let encryptedTitle = encryptAES(NoteTitleField.current?.value, masterpass);
            let encryptedContent = encryptAES(markdown, masterpass);
            console.log(encryptedContent)
            axios.post("/api/vault/note-save/"+uuid, {
                name: encryptedTitle,
                content: encryptedContent
            })
                 .then(response => {
                    setSnackBarStatus({open: true, message: "Note was saved sucessfully!", severity: true});
                 }, (error) => {
                    console.warn("Note error:", error);
                    setSnackBarStatus({open: true, message: "Something went wrong!", severity: false});
                 });
        };
    };
    return (
        <div className="App">
            {showAlert && <Container>
                <Alert severity="error" sx={{ width: '100%' }}>
                    "Note title" and "Note text" cannot be empty!
                </Alert>
            </Container>}

            <Container>
                <div className="centerMe giveMeSmallSpace">
                    <TextField inputRef={NoteTitleField} sx={{ maxWidth: 600, width: "100%" }} 
                    color="secondary" label="Note title" variant="outlined" defaultValue={NoteTitle}/>
                    <Tooltip title={"Here you can learn how to write better notes \n \n https://www.markdownguide.org/basic-syntax/"} arrow>
                        <IconButton onClick={() => window.open("https://www.markdownguide.org/basic-syntax/", "_blank")}>
                            <Info/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Container>

            <Container>
                <div className="giveMeSmallSpace">
                    <Stack direction="row" spacing={2}
                        divider={<Divider orientation="vertical" flexItem />} 
                        alignItems="center" justifyContent="center">
                      <Button sx={{ maxWidth: 300, width: "100%" }} variant="contained" onClick={() => setDisplay("Editor")} >Editor</Button>
                      <Button sx={{ maxWidth: 300, width: "100%" }} variant="contained" onClick={() => setDisplay("Syntax")} >Syntax</Button>
                      <Button sx={{ maxWidth: 300, width: "100%" }} variant="contained" onClick={() => setDisplay("Preview")} >Preview</Button>
                    </Stack>
                </div>
                
                { display === "Editor" && <div>
                    <FormControlLabel label="Live preview"
                        control={<Switch
                            color="secondary"
                            checked={checked}
                            onChange={handleChangeSwitch}
                            inputProps={{ 'aria-label': 'Live preview' }}
                          />}/>
                    <Box>
                        <div className="Displayflex">
                            <textarea
                                spellCheck="false"
                                className={checked ? "editor editorSmallWidth" : "editor editorBigWidth"}
                                value={markdown}
                                placeholder={"You can type here ..."}
                                onChange={e => setMarkdown(e.target.value)}
                            ></textarea>
                            <Divider orientation="vertical" flexItem></Divider>
                            { checked && <Markdown markdown={markdown} checked={checked} />  }
                        </div>
                    </Box>
                </div>}

                { display === "Syntax" && <MarkdownSyntax markdown={markdown} />}
                { display === "Preview" && <Markdown markdown={markdown} checked={false} />}
            </Container>

            <Container>
                <div className="giveMeSmallSpace centerMe">
                    <Button sx={{ maxWidth: 600, width: "100%" }} variant="contained" onClick={saveNote}>Save</Button>
                    <Snackbar open={snackBarStatus.open} autoHideDuration={4000} onClose={handleCloseSnacBar}>
                      <Alert onClose={handleCloseSnacBar} severity={snackBarStatus.severity ? "success" : "error"} sx={{ width: '100%' }}>
                        {snackBarStatus.message}
                      </Alert>
                    </Snackbar>
                </div>
            </Container>
            
        </div>
    );
};


export default Notes;