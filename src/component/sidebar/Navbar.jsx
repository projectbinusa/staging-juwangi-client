// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types"; 
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Settings, Logout, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar] = useState("https://tse4.mm.bing.net/th?id=OIP.dErkv765aE3IKCmV9q5dPQHaHa&pid=Api&P=0&h=180"); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ background: "transparent", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ color: "#333" }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Dashboard
          </Typography>

          <IconButton onClick={handleMenuOpen}>
            <Avatar src={avatar} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
              <AccountCircle sx={{ marginRight: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ marginRight: 1 }} /> Settings
            </MenuItem>
            <MenuItem onClick={() => { navigate("/login"); handleMenuClose(); }}>
              <Logout sx={{ marginRight: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default Navbar;
