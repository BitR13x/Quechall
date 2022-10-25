import React from "react";
import { Container, Button, Divider } from "@mui/material";
import "../scss/pages/NoMatch.scss";
import { useNavigate } from "react-router-dom";

const NoMatch = ({ RetPath = "/" }) => {
    let navigation = useNavigate();
    return (
        <React.Fragment>
            <div className="NotFoundMain" style={{ textAlign: "center" }}>
                <Container>
                    <div className="container">
                        <span className="box">
                            <h1 className="glitch-text">404 NOT FOUND</h1>
                        </span>
                    </div>
                    <br />
                    <h4 className="glitch-text">Here is nothing.</h4>
                </Container>
                <div className="giveMeSpace container">
                    <Divider variant="middle" sx={{ width: 800 }} />
                </div>
                <div className="giveMeSpace">
                    <Button variant="outlined" color="secondary" onClick={() => navigation(RetPath)}>Return Home</Button>
                </div>
            </div>
        </React.Fragment>
    );
};


export default NoMatch;