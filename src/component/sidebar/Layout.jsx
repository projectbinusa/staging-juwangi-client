import React, { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "./SideBar";
import { Box, Button } from "@mui/material";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
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
