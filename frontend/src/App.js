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

function App() {
  return (
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
          <Route element={<ResetPassword />}path="resetpassword" />
        </Route>
        <Route element={<User />} path = "user">
          <Route element={< Userprofile />}path="uprofile"/>
          <Route element={< AddArtwork />}path="addArtwork"/>
          <Route element={< ManageArtwork />}path="manageartwork"/>
          <Route element={< ManageExhibition />}path="manaexhibition"/>
        </Route>
         <Route element ={<Navigate to="/main/login" />} path=""></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
