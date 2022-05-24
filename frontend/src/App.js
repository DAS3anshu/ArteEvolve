import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/main/login';
import Main from './components/main';
import User from './components/user';
import Admin from './components/admin';
import AdminProfile from './components/admin/profile';
import Dashboard from './components/admin/dashboard';
import Manageruser from './components/admin/manageruser';
import Home from './components/main/home';
import ResetPassword from './components/main/resetPassword';
import Userprofile from './components/user/profile';
import AddArtwork from './components/user/AddArtwork';
import ManageArtwork from './components/user/ManageArtwork';
import ManageExhibition from './components/user/ManageExhibition';
import Header from './components/main/header';
import SignUp from './components/main/signup';
import Exhibition from './components/main/exhibition';
import Exhibition3 from './components/main/exhibition3';
import BrowseExhibition from './components/main/browseExhibition';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

function App() {
  TimeAgo.addDefaultLocale(en);
  const myTheme = createTheme({
    palette: {
      primary: {
        main: "#ca00d7",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Toaster position="top-center" />
   <BrowserRouter>
      <Routes >
        <Route element={<Admin />} path = "admin">
          <Route element={<AdminProfile />}path="profile" />
          <Route element={<Dashboard />}path="dashboard" />
          <Route element={<Manageruser />}path="manageruser" />
        </Route>
        <Route element={<Main />} path = "main">
          <Route element={<Home />}path="home" />
          <Route element={<Login />}path="login" />
          <Route element={<SignUp />}path="signup" />
          <Route element={<Exhibition />}path="exhibition/:exid" />
          <Route element={<Exhibition3 />}path="exhibition3" />
          <Route element={<ResetPassword />}path="resetpassword" />
          <Route element={<BrowseExhibition />}path="browse" />
        </Route>
        <Route element={<User />} path = "user">
          <Route element={< Userprofile />}path="profile"/>
          <Route element={< AddArtwork />}path="addArtwork"/>
          <Route element={< ManageArtwork />}path="manageartwork"/>
          <Route element={< ManageExhibition />}path="manageexhibition"/>
        </Route>
         <Route element ={<Navigate to="/main/login" />} path=""></Route>
      </Routes>
   </BrowserRouter>
   </ThemeProvider>
  );
}

export default App;
