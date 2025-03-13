// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(true); 

  return (
    <Box display="flex">
      <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> 
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1,
          p: 0,
          transition: "margin 0.3s ease-in-out",

          marginleft: openDrawer ? "240px" : "60px", 
          // overflow: "auto" ,

          marginLeft: openDrawer ? "240px" : "60px", 
          overflow: "auto", 

        }}
      >
        <Toolbar />
        <Outlet context={{ openDrawer }} />
      </Box>
    </Box>
  );
};

export default Layout;
