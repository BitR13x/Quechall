import './scss/App.scss';
import NavbarComponent from "./components/header/navbar";
import CirclesAnimation from "./components/animation/circles";
import FeatureCard from "./components/FeatureCard";
import { Grid, Container } from '@mui/material';

const App = () => {
  return (
    <div className="App">
      <NavbarComponent/>
      <h1 className='AppName'>QueChall</h1>
      <div className='AppDescription'>
        <p>Challange your self and have a better passwords</p>
      </div>

      <div className='features'>
        <h3>Simple registration, We don't sell any data, secure</h3>
      </div>
      
      <Container>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{ title: "Simple to use"}} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{title: "Secured", subheader: "Sub", content: "HELLO"}}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{title: "Home", subheader: "Sub", content: "HELLO"}}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard feature={{title: "Home", subheader: "Sub", content: "HELLO"}}/>
            </Grid>
          </Grid>
        </Container>
      <CirclesAnimation />
    </div>
  );
};

export default App;
