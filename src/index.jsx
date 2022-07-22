import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import Dashboard from "./pages/Dashboard";
import Question from "./pages/Question";
import About from './pages/About';
import NoMatch from "./pages/NoMatch";
import Notes from './pages/Notes';
import SecretTSX from './pages/secret';
import LoginPage from './pages/user/login';
import Logout from "./pages/logout";
import RegisterPage from './pages/user/register';
import ProfileSettings from './pages/profile/profileSettings';
import SetMasterPass from './pages/SetMasterPass';

import './scss/index.scss';

import Store from './components/Store/Store';

import NavbarComponent from "./components/header/navbar";
import VerticalNavbar from "./components/header/verticalnavbar";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
console.info("If you will have any problem you can contact us, we will appreciate it");
console.log(document.location.hostname)

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#311b92",
      contrastText: '#fff'
    },
    secondary: {
      main: '#1e88e5',
      contrastText: '#fff'
    }
  },
  typography: {
    fontSize: 20
  }
});

const login = (localStorage.getItem("token") ) ? true : false;
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Store>
      <BrowserRouter>
        <NavbarComponent login={login} />
          {login ?
          <Routes>
            <Route exact path="/" element={<App login={login} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setMasterPass" element={<SetMasterPass />} />
            <Route path="/Questions" element={<Question />} />
            <Route path="/create/notes" element={<Notes />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
            <Route path="/451121e2-f4c2-11ec-b939-0242ac120002" element={<SecretTSX />} />
            <Route path="*" element={<NoMatch RetPath="/dashboard" />} status={404} />
          </Routes>
          :
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/Questions" element={<Question />} />
            <Route path="/451121e2-f4c2-11ec-b939-0242ac120002" element={<SecretTSX />} />
            <Route path="*" element={<NoMatch />} status={404} />
          </Routes>}
        <VerticalNavbar/>
      </BrowserRouter>
    </Store>
  </ThemeProvider>
</React.StrictMode>
);