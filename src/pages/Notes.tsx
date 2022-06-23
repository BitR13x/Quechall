import React, { useState } from "react";
import Markdown from "../components/Markdown";
import MarkdownSyntax from "../components/MarkdownSyntax";
import { Container, Button, Stack, Divider, Switch, FormControlLabel, Box } from '@mui/material';

const Notes = () => {
    const [markdown, setMarkdown] = useState("");
    const [display, setDisplay] = useState("Editor");
    const [checked, setChecked] = useState(false);
    const handleChangeSwitch = () => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }
    const saveNote = () => {

    }

    return (
        <div className="App">
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
                </div>
            </Container>
            
        </div>
    );
};


export default Notes;