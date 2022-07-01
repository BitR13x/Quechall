import axios from "axios";
import React, { useState } from "react";
import CirclesAnimation from "../components/animation/circles";
import LoadingApp from "../components/animation/LoadingApp";

const Logout = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    axios.post("/api/logout")
         .then(response => {
            setMessage(response.data.message);
            setLoading(false);
         }, (error) => {
            setMessage(error.response.data.message);
            setLoading(false);
         });
    return (
        <div className="App">
            {loading ? 
            <React.Fragment>
                <div style={{paddingTop: "15vh"}}>
                    { (message) && <h2>{message}</h2>}
                </div>
                <CirclesAnimation />
            </React.Fragment> : <LoadingApp/>}
        </div>
    );
}

export default Logout;