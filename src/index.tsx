import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import APIPage from "./pages/api";
import Dashboard from "./pages/user/Dashboard";
import Feedback from "./pages/Feedback";
import About from './pages/About';
import NoMatch from "./pages/NoMatch";
import Notes from './pages/user/Notes';
import SecretTSX from './pages/secrets/secret';
import Secret2TSX from "./pages/secrets/secret2";
import LoginPage from './pages/user/login';
import Logout from "./pages/user/logout";
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
if (document.location.hostname !== "localhost" && document.location.hostname !== "quechall.space") {
  document.location.replace("https://quechall.space");
}

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

const login = (localStorage.getItem("token")) ? true : false;
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Store>
        <BrowserRouter>
          <NavbarComponent login={login} />
          {login ?
            <Routes>
              {/* 
            //@ts-ignore */}
              <Route exact path="/" element={<App login={login} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setMasterPass" element={<SetMasterPass />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/create/notes" element={<Notes />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<APIPage />} />
              <Route path="/451121e2-f4c2-11ec-b939-0242ac120002" element={<SecretTSX />} />
              <Route path="/2b04b062-4a6b-4786-a0a9-349d712175c7" element={<Secret2TSX />} />
              <Route path="*" element={<NoMatch RetPath="/dashboard" />} />
            </Routes>
            :
            <Routes>
              {/* 
            //@ts-ignore */}
              <Route exact path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<APIPage />} />
              <Route path="/Feedback" element={<Feedback />} />
              <Route path="/451121e2-f4c2-11ec-b939-0242ac120002" element={<SecretTSX />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>}
          <VerticalNavbar />
        </BrowserRouter>
      </Store>
    </ThemeProvider>
  </React.StrictMode>
);