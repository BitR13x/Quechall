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
import NoMatch from "./pages/NoMatch";
import Notes from './pages/Notes';
import LoginPage from './pages/user/login';
import RegisterPage from './pages/user/register';

import './scss/index.scss';

import NavbarComponent from "./components/header/navbar";
import VerticalNavbar from "./components/header/verticalnavbar";
import CirclesAnimation from "./components/animation/circles";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

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

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/question" element={<Question />} />
          <Route path="/create/notes" element={<Notes />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NoMatch />} status={404}/>
        </Routes>
        <VerticalNavbar/>
        <CirclesAnimation/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);