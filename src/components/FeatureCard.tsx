import { Card, CardContent } from "@mui/material";
import React from "react";

const FeatureCard = ({ feature }) => {
    return (
        <Card variant="elevation" sx={{height: 110}}>
            {/* <CardHeader title={feature.title} /> */}
            <CardContent>
                <p style={{fontSize: "2rem", color: "#17a2b8"}}>
                    {feature.title}
                </p>
                <div style={{marginTop: "0.5rem"}}></div>
                <p style={{fontSize: "1.25rem"}}>
                    {feature.content}
                </p>
            </CardContent>
        </Card>
    );
};


export default FeatureCard;