// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar"; 
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(true);

  return (
    <Box display="flex">
      <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      
      <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
        <Navbar toggleDrawer={() => setOpenDrawer(!openDrawer)} /> 
        <Toolbar />
        <Outlet context={{ openDrawer }} />
      </Box>
    </Box>
  );
};

export default Layout;
