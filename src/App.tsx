import './scss/App.scss';
import FeatureCard from "./components/FeatureCard";
import CirclesAnimation from "./components/animation/circles";
import { Grid, Container, Button, Stack, Divider } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <div className='AppCenter'>
        <h1 className='AppName'>QueChall</h1>
        <div className='AppDescription'>
          <p>Challange your self and have a better passwords</p>
        </div>
        
        <div style={{ paddingTop: "7vh" }}>
          <Container>
            <Stack direction="row" spacing={2}
            divider={<Divider orientation="vertical" flexItem />} 
            alignItems="center" justifyContent="center">
              <Button sx={{ width: 200 }} variant="contained" href='/login'>log in</Button>
              <Button sx={{ width: 200 }} variant="contained" href='/register'>Sign up</Button>
            </Stack>
          </Container>
        </div>

        <div className='features'>
          <h3>Simple registration, We don't sell any data, secure</h3>
        </div>
      </div>
      
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "he", subheader: "Sub", content: "HELLO" }} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Secured", subheader: "Sub", content: "HELLO" }}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard feature={{ title: "Home", subheader: "Sub", content: "HELLO" }}/>
          </Grid>
        </Grid>
      </Container>

      <div className='giveMeSpace centerMe'>
          <Button sx={{ maxWidth: 300, width: "100%", marginTop: "2vh" }} variant="contained" href='/about'>About</Button>
      </div>
      <CirclesAnimation/>
    </div>
  );
};

export default App;
