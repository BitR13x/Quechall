import React from "react";
import NavbarComponent from "../components/header/navbar";
import CirclesAnimation from "../components/animation/circles";

const NoMatch = () => {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div style={{ textAlign: "center" }}>
                <header>
                    <h1>404 NOT FOUND</h1>
                </header>
                <main style={{ padding: "1rem 0" }}>
                    <h1>There is nothing.</h1>
                </main>
            </div>
            <CirclesAnimation/>
        </React.Fragment>
    );
};


export default NoMatch;