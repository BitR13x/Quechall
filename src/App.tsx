import './scss/App.scss';
import NavbarComponent from "./components/navbar";

const App = () => {
  return (
    <div className="App">
      <div className='imageContainer'>
        <NavbarComponent/>

        <h1 className='AppName'>HELLO</h1>
        <div className='AppDescription'>
          <p>This Hello message is ****</p>
        </div>

      </div> 
      <div className='features'>
          <h3> HERE IS GONNA BE SOMETHING INTERESTING</h3>
      </div> 
    </div>
  );
};

export default App;
