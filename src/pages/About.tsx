import { Container, Divider, Typography } from '@mui/material';
import "../scss/pages/about.scss";

const About = () => {

    return (
      <div className="App">
        <Container>
            <Typography variant="h2" textAlign="center">
                We're QueChall
            </Typography>
            <div style={{textAlign: "center"}}>
                <p>We want freedom and privacy to be the number one</p>
            </div>
            <div className="giveMeSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>
            <Typography variant='subtitle1' textAlign="center">

            </Typography>
        </Container>
      </div>  
    );
};

export default About;