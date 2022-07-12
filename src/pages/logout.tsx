import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CirclesAnimation from "../components/animation/circles";
import LoadingApp from "../components/animation/LoadingApp";
import { VHOST } from "../vhost";

const Logout = () => {
    const [status, setStatus] = useState({loading: true, message: ""});
    useEffect(() => {
        axios(VHOST+"/api/logout", {
            method: "post",
            withCredentials: true
        })
             .then(response => {
                setStatus({loading: false, message: response.data.message});
                localStorage.clear();
                window.location.replace("/");
             }, (error) => {
                console.warn("Logout error:",error);
                localStorage.clear();
                setStatus({loading: false, message: error.response.data.message});
             });
    }, [])
    return (
        <div className="App">
            {status.loading ? 
            <LoadingApp/> 
            : <React.Fragment>
               <div style={{paddingTop: "15vh"}}>
                   { (status.message) && <Typography textAlign={"center"} variant={"h3"}>
                    {status.message}
                   </Typography>}
               </div>
            </React.Fragment>}
            <CirclesAnimation />
        </div>
    );
}

export default Logout;