import { AccountCircle, Dashboard } from '@mui/icons-material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';

const User = () => {

  const sidebarOptions = [
    {
      name : 'Manage Profile',
      icon : <AccountCircle />,
      link : '/user/profile',
    },
    {
      name : 'Dashboard',
      icon : <Dashboard />,
      link : '/admin/dashboard',
    },
 
  ]
  return (
    <div>
      <h1>User Component</h1>
      <Sidebar sidebarOptions={sidebarOptions} title="User Dashboard">
          <Outlet />
        </Sidebar>
      
    </div>
  );
}

export default User;