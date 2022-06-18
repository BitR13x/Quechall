import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React from "react";

const FeatureCard = ({ feature }) => {
    return (
        <Card variant="outlined">
            <CardHeader title={feature.title} subheader={feature.subheader} />
            <CardContent>
                <Typography>
                    {feature.content}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default FeatureCard;