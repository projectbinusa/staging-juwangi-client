// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "./SideBar";
import { Box, Button } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={3}>
        {/* Tambahkan Toolbar agar konten tidak tertutup oleh AppBar */}
        <Toolbar />

    <Box display="flex" minHeight="100vh" bgcolor="#fff" color="#000"> 
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Konten utama */}
      <Box flexGrow={1} p={6} display="flex" flexDirection="column">
        {/* Tombol Buka Sidebar */}
        <Button
          variant="contained"
          sx={{ alignSelf: "start", mb: 2 }}
          onClick={() => setSidebarOpen(true)}
        >
          Open Sidebar
        </Button>
        {/* Halaman Konten */}

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
