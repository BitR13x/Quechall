import React from "react";
import "../../scss/animation/LoadingApp.scss";

const LoadingApp = () => {
    return (
        <React.Fragment>
            <div className="loader-wrapper">
                <span className="loader"><span className="loader-inner"></span></span>
            </div>
        </React.Fragment>
    )
}

export default LoadingApp;