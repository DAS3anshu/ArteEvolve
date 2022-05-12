import React from 'react';
import { Outlet } from 'react-router-dom';
import {AccountCircle, Dashboard} from '@mui/icons-material';
import Sidebar from '../sidebar';

const Admin = () => {

 const sidebarOptions = [
   {
     name : 'Manage Profile',
     icon : <AccountCircle />,
     link : '/admin/profile',
   },
   {
     name : 'Dashboard',
     icon : <Dashboard />,
     link : '/admin/dashboard',
   },

 ]
 

  return (
    <div>
        <h1>Admin Component</h1>
        <Sidebar sidebarOptions={sidebarOptions} title="Admin Dashboard">
          <Outlet />
        </Sidebar>
         
    </div>
  );
}

export default Admin;