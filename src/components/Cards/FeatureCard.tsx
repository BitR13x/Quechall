import { Card, CardContent } from "@mui/material";

const FeatureCard = ({ feature }) => {
    return (
        <Card variant="elevation" sx={{height: 150}}>
            {/* <CardHeader title={feature.title} /> */}
            <CardContent>
                <p style={{fontSize: "2.5rem", color: "#8A75E6"}}>
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