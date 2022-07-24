import React from "react";
import axios from "axios";
import { TextField, Button, Divider, Typography } from "@mui/material";

const Question = () => {
    let Questionfield = React.useRef<HTMLInputElement>();
    const sendData = () => {
        axios.post('/api/question/get')
            .then((data)=> {
                
            })

    // console.log(Ticketfield.current.value)
    }

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <Typography fontFamily='"Courier New", Courier, monospace' variant="h2">
                    Contact
                </Typography>
                <p>if you want to ask us something, we will try to answer as soon as posible</p>
                <div className="giveMeSpace centerMe">
                  <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
                </div>
                <main style={{ padding: "1rem 0" }}>
                    
                    
                    <div>
                        <TextField inputRef={Questionfield} id="outlined-name" color="secondary" label="Your question?"
                         variant="outlined" margin="normal" helperText="We will answer you question." />
                    </div>
                    <Button variant="contained" color="primary" onClick={sendData}>
                        Submit
                    </Button>
                </main>
            </div>
        </div>
    );
};


export default Question;