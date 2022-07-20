import { Container, Typography } from '@mui/material';

const SecretTSX = () => (
  <div className="App" style={{marginTop: "7vh"}}>
    <Typography variant="h3" textAlign="center">
        I Guess You find Me.
    </Typography>
    <Container>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <iframe width="992" height="661" src="https://www.youtube.com/embed/QH2-TGUlwu4" 
                title="Nyan Cat [original]" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
        </div>
    </Container>
  </div>  
);

export default SecretTSX;
