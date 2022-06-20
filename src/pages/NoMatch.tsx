import React from "react";
import NavbarComponent from "../components/header/navbar";
import CirclesAnimation from "../components/animation/circles";
import VerticalNavbar from "../components/header/verticalnavbar";
import { Container, Button, Divider } from "@mui/material";
import "../scss/pages/NoMatch.scss";

const NoMatch = () => {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div className="NotFoundMain" style={{ textAlign: "center" }}>
                <Container>
                    <div className="container">
                        <span className="box">
                            <h1 className="glitch-text">404 NOT FOUND</h1>
                        </span>
                    </div>
                    <br/>
                    <h4 className="glitch-text">Here is nothing.</h4>
                </Container>
                <div className="giveMeSpace container">
                    <Divider variant="middle" sx={{width: 800}} />
                </div>
                <div className="giveMeSpace">
                    <Button variant="outlined" color="secondary" href="/">Return Home</Button>
                </div>
            </div>
            <VerticalNavbar/>
            <CirclesAnimation/>
        </React.Fragment>
    );
};


export default NoMatch;