// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(true); // Tambahkan state untuk sidebar

  return (
    <Box display="flex">
      <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> {/* Kirim ke Sidebar */}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          transition: "margin 0.3s ease-in-out",
          marginRight: openDrawer ? "210px" : "280px", // Geser konten
        }}
      >
        <Toolbar />
        <Outlet context={{ openDrawer }} />
      </Box>
    </Box>
  );
};

export default Layout;
