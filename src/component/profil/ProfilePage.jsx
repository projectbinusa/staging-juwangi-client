// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import MainCard from '../MainCard';
import Breadcrumbs from '../Breadcrumbs';

export default function ProfilePage() {
  const { pathname } = useLocation();
  let selectedTab = 0;

  // Menentukan tab yang aktif berdasarkan URL
  switch (pathname) {
    case '/profile/personal':
      selectedTab = 1;
      break;
    case '/profile/my-account':
      selectedTab = 2;
      break;
    case '/profile/password':
      selectedTab = 3;
      break;
    case '/profile/role':
      selectedTab = 4;
      break;
    case '/profile/settings':
      selectedTab = 5;
      break;
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Breadcrumbs heading="User Profile" />
      <MainCard>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Profile" component={Link} to="/profile/basic" />
            <Tab label="Personal" component={Link} to="/profile/personal" />
            <Tab label="My Account" component={Link} to="/profile/my-account" />
            <Tab label="Change Password" component={Link} to="/profile/password" />
            <Tab label="Role" component={Link} to="/profile/role" />
            <Tab label="Settings" component={Link} to="/profile/settings" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
}
