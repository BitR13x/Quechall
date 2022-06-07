import NavbarComponent from "./navbar";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const Ticket = () => {

    const sendData = () => {
        let ticket = document.getElementById("outlined-name").value;
        if (!ticket || ticket.length < 3) return
        axios.post('/api/question/get')
            .then((data)=> {
                console.log(data)
            })
    }

    return (
        <div className="App" style={{ textAlign: "center" }}>
            <NavbarComponent />
            
            <div>
                <TextField id="outlined-name" color="secondary" label="Ticket" variant="outlined" margin="normal" helperText="Please enter your ticket"/>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={sendData}>
                  Submit
                </Button>
            </div>
            

        </div>
    );
};


export default Ticket;