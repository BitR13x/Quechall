import React from "react";
import axios from "axios";
import { Button, Divider, Typography, Tooltip, IconButton } from "@mui/material";
import { Info } from '@mui/icons-material';
import CirclesAnimation from "../components/animation/circles";
import StackBarResponseHandling from "../components/StackBarResponseHandling";

const FeedbackPage = () => {
    const [ textarea, setTextArea ] = React.useState("");
    const [snackBarStatus, setSnackBarStatus] = React.useState({open: false, message: "", severity: false});

    const sendData = () => {
        axios.post('/api/feedback/submit', {
            feedback: textarea
        })
            .then(response => {
                setSnackBarStatus({open: true, message: "Thank you for your feedback.", severity: true})
            }, (error) => {
                console.warn("Feedback error:", error);
            });
    };

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <Typography fontFamily='"Courier New", Courier, monospace' variant="h2">
                    Feedback
                    <Tooltip title={"if you'd like to be reached, please add a contact"} arrow>
                        <IconButton>
                            <Info/>
                        </IconButton>
                    </Tooltip>
                </Typography>
                <p>Give us your feedback, we will appreciate anything</p>
                
                <div className="giveMeSmallSpace centerMe">
                  <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
                </div>

                <main style={{ padding: "1rem 0" }}>
                    <div>
                        <textarea
                            style={{maxWidth: 800, width: "80%"}}
                            spellCheck="false"
                            className="editor"
                            value={textarea}
                            placeholder={"You can type here ..."}
                            onChange={e => setTextArea(e.target.value)}
                        ></textarea>
                    </div>
                    <Button disabled={snackBarStatus.severity ? true : false} sx={{maxWidth: 800, width: "80%"}} 
                            variant="contained" color="primary" onClick={sendData}>
                        Submit
                    </Button>
                </main>
            </div>
            <CirclesAnimation/>
            {/*//? response handling  */}
            <StackBarResponseHandling 
                setSnackBarStatus={setSnackBarStatus} 
                snackBarStatus={snackBarStatus} 
            />
        </div>
    );
};


export default FeedbackPage;