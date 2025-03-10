// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        {/* Tambahkan Toolbar agar konten tidak tertutup oleh AppBar */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
