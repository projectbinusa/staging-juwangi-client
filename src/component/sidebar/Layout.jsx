// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "./SideBar";
import { Box, Button } from "@mui/material";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box display="flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box flexGrow={1} p={2}>
        <Button variant="contained" onClick={() => setSidebarOpen(true)}>
          Open Sidebar
        </Button>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
