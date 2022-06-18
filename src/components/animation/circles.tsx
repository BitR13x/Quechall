import React from "react";
import "../../scss/animation/circles.scss";

const CirclesAnimation = () => {
    return (
        <React.Fragment>
            <div className="bubbles-container">
                { [...Array(50)].map((_, i) => 
                <div className="circle-container" key={i}>
                    <div className="circle"></div>
                </div> )}
            </div>
        </React.Fragment>
    )
}

export default CirclesAnimation;