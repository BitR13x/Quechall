import './scss/App.scss';
import FeatureCard from "./components/FeatureCard";
import CirclesAnimation from "./components/animation/circles";
import { Grid, Container, Button, Stack, Divider, Typography } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <Container>
      <div className='AppCenter'>
        <h1 className='AppName'>QueChall</h1>
        <div className='AppDescription'>
          <p>Challange your self and have better passwords</p>
        </div>
        
        <div className="giveMeSpace centerMe">
          <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
        </div>

        <div>
          <Container className="giveMeSpace">
            <Stack direction="row" spacing={2}
            divider={<Divider orientation="vertical" flexItem />} 
            alignItems="center" justifyContent="center">
              <Button sx={{ width: 200 }} variant="contained" href='/login'>log in</Button>
              <Button sx={{ width: 200 }} variant="contained" href='/register'>Sign up</Button>
            </Stack>
          </Container>
        </div>

        <div className="giveMeSpace">
          <Typography variant="h5">
            keep your passwords and notes sync and safe.
          </Typography>
        </div>
      </div>
      
      <Container className='giveMeSpace'>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Sync with diffrent devices", subheader: "Sub", content: "" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Simple registration", subheader: "Sub", content: "" }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Only you can see your data", subheader: "Sub", content: "" }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Generate your own secure password", subheader: "Sub", content: "" }}/>
          </Grid>
        </Grid>
      </Container>

      <div className='giveMeSpace centerMe'>
          <Button sx={{ maxWidth: 300, width: "100%", marginTop: "2vh" }} variant="contained" href='/about'>About</Button>
      </div>
      </Container>
      <CirclesAnimation/>
    </div>
  );
};

export default App;
