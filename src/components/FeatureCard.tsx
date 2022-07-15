import { Card, CardHeader } from "@mui/material";
import React from "react";

const FeatureCard = ({ feature }) => {
    return (
        <Card variant="elevation" sx={{height: 110}}>
            <CardHeader title={feature.title} />
            {/* <CardContent>
                <Typography>
                    {feature.content}
                </Typography>
            </CardContent> */}
        </Card>
    );
};


export default FeatureCard;