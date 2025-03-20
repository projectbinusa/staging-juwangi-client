// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import PropTypes from "prop-types"; 
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Settings,
  AccountCircle,
  Brightness4,
  Brightness7,
  ExitToApp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext"; 

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [avatar] = useState("https://tse1.mm.bing.net/th?id=OIP.fu5mCwl95AHkzT5ibPTsyAHaHa&pid=Api&P=0&h=180"); 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ background: mode === "dark" ? "#333" : "#1976D2", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon sx={{ color: mode === "dark" ? "white" : "#333" }} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <IconButton onClick={() => navigate("/login")} sx={{ color: "white" }}>
            <ExitToApp />
          </IconButton>
          
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
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Settings
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