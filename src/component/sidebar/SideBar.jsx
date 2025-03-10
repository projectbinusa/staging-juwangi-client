// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Collapse,
  Switch,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Person,
  // School,
  // ExpandLess,
  // ExpandMore,
  ShoppingCart,
  // Folder,
  ExitToApp,
  NightsStay,
  Menu,
  ChevronLeft,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(true); // Default terbuka
  // const [openAkademik, setOpenAkademik] = useState(false);
  // const [openPendukung, setOpenPendukung] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
  };

  return (
    <>
      {/* Navbar dengan tombol buka sidebar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(!openDrawer)}>
            <Menu />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={openDrawer}
        sx={{
          width: openDrawer ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: openDrawer ? 240 : 60,
            transition: "width 0.3s",
            overflowX: "hidden",
            backgroundColor: "#1976D2",
            color: "#fff",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: openDrawer ? "space-between" : "center" }}>
          {openDrawer && <Typography variant="h6">Menu</Typography>}
          <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: "white" }}>
            {openDrawer ? <ChevronLeft /> : <Menu />}
          </IconButton>
        </Toolbar>
        <Divider />

        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/products")}>
              <ListItemIcon sx={{ color: "white" }}>
                <Dashboard />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Dashboard" />}
            </ListItemButton>
          </ListItem>

          {/* Profil */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/profile")}>
              <ListItemIcon sx={{ color: "white" }}>
                <Person />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Profil" />}
            </ListItemButton>
          </ListItem>

          {/* Data Akademik
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenAkademik(!openAkademik)}>
              <ListItemIcon sx={{ color: "white" }}>
                <School />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Data Akademik" />}
              {openDrawer && (openAkademik ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={openAkademik && openDrawer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/akademik/mata-kuliah")}>
                <ListItemText primary="Mata Kuliah" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/akademik/nilai")}>
                <ListItemText primary="Nilai" />
              </ListItemButton>
            </List>
          </Collapse> */}

          {/* Data Pendukung
          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenPendukung(!openPendukung)}>
              <ListItemIcon sx={{ color: "white" }}>
                <Folder />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Data Pendukung" />}
              {openDrawer && (openPendukung ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          <Collapse in={openPendukung && openDrawer} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton onClick={() => navigate("/pendukung/dokumen")}>
                <ListItemText primary="Dokumen" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/pendukung/sertifikat")}>
                <ListItemText primary="Sertifikat" />
              </ListItemButton>
            </List>
          </Collapse> */}

          {/* Pesanan */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/user")}>
              <ListItemIcon sx={{ color: "white" }}>
                <ShoppingCart />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Pesanan" />}
            </ListItemButton>
          </ListItem>

          {/* Logout */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/login")}>
              <ListItemIcon sx={{ color: "red" }}>
                <ExitToApp />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Logout" sx={{ color: "red" }} />}
            </ListItemButton>
          </ListItem>

          {/* Dark Mode */}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>
                <NightsStay />
              </ListItemIcon>
              {openDrawer && <ListItemText primary="Dark Mode" />}
              {openDrawer && <Switch checked={darkMode} onChange={toggleDarkMode} />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
