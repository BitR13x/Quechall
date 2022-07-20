import { Card, CardContent } from "@mui/material";
import React from "react";

const FeatureCard = ({ feature }) => {
    return (
        <Card variant="elevation" sx={{height: 140}}>
            {/* <CardHeader title={feature.title} /> */}
            <CardContent>
                <p style={{fontSize: "2.5rem", color: "#17a2b8"}}>
                    {feature.title}
                </p>
                <div style={{marginTop: "0.75rem"}}></div>
                <p style={{fontSize: "1.50rem"}}>
                    {feature.content}
                </p>
            </CardContent>
        </Card>
    );
};


export default FeatureCard;