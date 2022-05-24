import { AccountCircle, AddPhotoAlternate, Collections, Dashboard, ManageAccounts, } from '@mui/icons-material';
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
      name : 'AddArtwork',
      icon : <AddPhotoAlternate />,
      link : '/user/AddArtwork',
    },
    {
      name : 'ManageArtwork',
      icon : <ManageAccounts />,
      link : '/user/ManageArtwork',
    },
    {
      name : 'ManageExhibition',
      icon : <Collections />,
      link : '/user/ManageExhibition',
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