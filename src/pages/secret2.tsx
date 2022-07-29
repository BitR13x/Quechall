import { Container, Typography } from '@mui/material';

const Secret2TSX = () => (
  <div className="App" style={{marginTop: "7vh"}}>
    <Typography variant="h3" textAlign="center">
        You Are On Streak, Keep It Going.
    </Typography>
    <Container>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            title="Rick Astley - Never Gonna Give You Up (Official Music Video)" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
        />
        </div>
    </Container>
  </div>  
);

export default Secret2TSX;
