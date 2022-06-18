import React from "react";
import NavbarComponent from "./navbar";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const Question = () => {
    let Ticketfield = React.useRef<HTMLInputElement>();
    const sendData = () => {
        axios.post('/api/question/get')
            .then((data)=> {
                
            })

    console.log(Ticketfield.current.value)
    }

    return (
        <React.Fragment>
            <NavbarComponent />
            <div style={{ textAlign: "center" }}>
                <header>
                    <h1>Dashboard</h1>
                </header>
                <main style={{ padding: "1rem 0" }}>
                    Hello This is Dashboard
                    
                    <div>
                        <TextField inputRef={Ticketfield} id="outlined-name" color="secondary" label="Answer" variant="outlined" margin="normal" />
                    </div>
                    <Button variant="contained" color="primary" onClick={sendData}>
                        Submit
                    </Button>
                </main>
            </div>
        </React.Fragment>
    );
};


export default Question;