// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Box, ListItemIcon
} from "@mui/material";
import {
  Menu as MenuIcon, Settings, AccountCircle, Brightness4, Brightness7, ExitToApp
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import PropTypes from "prop-types";

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [avatar] = useState("https://tse1.mm.bing.net/th?id=OIP.fu5mCwl95AHkzT5ibPTsyAHaHa&pid=Api&P=0&h=180");

  return (
    <AppBar
      position="fixed"
      sx={{
        background: mode === "dark" ? "#1E1E2F" : "#fff",
        color: mode === "dark" ? "#fff" : "#333",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton edge="start" onClick={toggleDrawer}>
          <MenuIcon sx={{ color: mode === "dark" ? "#fff" : "#333" }} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton onClick={() => navigate("/login")}>
            <ExitToApp />
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              src={avatar}
              sx={{
                border: `2px solid ${mode === "dark" ? "#555" : "#1976D2"}`,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} sx={{ mt: 1 }}>
            <MenuItem onClick={() => { navigate("/profile"); setAnchorEl(null); }}>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <ListItemIcon><Settings /></ListItemIcon>
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
