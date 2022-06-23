import React, { useState } from "react";
import Markdown from "../components/Markdown";
import MarkdownSyntax from "../components/MarkdownSyntax";
import { Container, Button, Stack, Divider, Switch, 
    FormControlLabel, Box, TextField, Snackbar, Alert } from '@mui/material';

const Notes = ({ NoteTitle = "", markdownDef = ""}) => {
    const [markdown, setMarkdown] = useState(markdownDef);
    const [display, setDisplay] = useState("Editor");
    const [checked, setChecked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    let NoteTitleField = React.useRef<HTMLInputElement>();

    const handleCloseSnacBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpenSnackBar(false);
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
            setOpenSnackBar(true);
            setShowAlert(false);
        };
        //? axios post request
    };

    return (
        <div className="App">
            {showAlert && <Container>
                <Alert severity="error" sx={{ width: '100%' }}>
                    "Note title" and "Note text" cannot be empty!
                </Alert>
            </Container>}
            
            <Container>
                <div className="giveMeSpace">
                    <Stack direction="row" spacing={2}
                        divider={<Divider orientation="vertical" flexItem />} 
                        alignItems="center" justifyContent="center">
                      <Button sx={{ width: 300 }} variant="contained" onClick={() => setDisplay("Editor")} >Editor</Button>
                      <Button sx={{ width: 300 }} variant="contained" onClick={() => setDisplay("Syntax")} >Syntax</Button>
                      <Button sx={{ width: 300 }} variant="contained" onClick={() => setDisplay("Preview")} >Preview</Button>
                    </Stack>
                </div>
                
                
                <div className="giveMeSmallSpace">
                    <TextField inputRef={NoteTitleField} sx={{ width: 300 }} 
                    color="secondary" label="Note title" variant="standard" defaultValue={NoteTitle}/>
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
                    <Button sx={{ width: 600 }} variant="contained" onClick={saveNote}>Save</Button>
                    <Snackbar open={openSnackBar} autoHideDuration={4000} onClose={handleCloseSnacBar}>
                      <Alert onClose={handleCloseSnacBar} severity="success" sx={{ width: '100%' }}>
                        Note was saved sucessfully!
                      </Alert>
                    </Snackbar>
                </div>
            </Container>
            
        </div>
    );
};


export default Notes;