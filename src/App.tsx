import './scss/App.scss';
import FeatureCard from "./components/Cards/FeatureCard";
import CirclesAnimation from "./components/animation/circles";
import { Grid, Container, Button, Stack, Divider, Paper } from '@mui/material';

const App = ({ login = false }) => (
  <div className="App">
    <Container className="foreGround">
      <div>
        <div className='AppCenter'>
          <h1 className='AppName'>QueChall</h1>
          <div className='AppDescription'>
            <p>Challange your self and have better passwords</p>
          </div>

          <div className="centerMe" style={{ marginTop: "5vh", marginBottom: "4vh" }}>
            <Divider variant="middle" sx={{ maxWidth: 800, width: "100%" }} />
          </div>

          {!login && <div>
            <Container className="giveMeSmallSpace">
              <Stack direction="row" spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center" justifyContent="center">
                <Button sx={{ maxWidth: 325, width: "100%" }} variant="contained" href='/login'>log in</Button>
                <Button sx={{ maxWidth: 325, width: "100%" }} variant="contained" href='/register'>Sign up</Button>
              </Stack>
            </Container>
          </div>}

          <div className="giveMeSpace centerMe">
            <Container>
              <Paper sx={{
                minHeight: 150, display: "flex", justifyContent: "center",
                alignItems: "center", textAlign: "center", verticalAlign: "middle", width: "100%"
              }}>
                <p style={{ fontSize: "2.5rem", color: "#054FFF" }}>
                  Keep your passwords and notes synced and safe.
                </p>
              </Paper>
            </Container>
          </div>
        </div>

        <div className="giveMeSmallSpace centerMe">
          <Divider variant="middle" sx={{ width: "100%" }} />
        </div>

        <Container className='giveMeSpace'>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{ title: "Take it anywhere", content: "Sync with diffrent devices." }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{ title: "Simple registration", content: "No additional information needed, register only with username and password." }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{ title: "We respect privacy", content: "Only you can see content of your notes and passwords." }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{ title: "Free to use", content: "Create, save and store your notes and password for free." }} />
            </Grid>
          </Grid>
        </Container>
        <div className="giveMeSmallSpace centerMe">
          <Divider variant="middle" sx={{ width: "100%" }} />
        </div>
        <div className='giveMeSpace centerMe'>
          <Button sx={{ maxWidth: 300, width: "100%", marginTop: "2vh" }} variant="contained" href='/about'>Learn More</Button>
        </div>
        <div className="giveMeSmallSpace centerMe">
          <Divider variant="middle" sx={{ maxWidth: 800, width: "100%" }} />
        </div>
      </div>
    </Container>
    <CirclesAnimation />
  </div>
);

export default App;
