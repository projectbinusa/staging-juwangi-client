import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Facebook, Apple } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const SideProfile = ({ setActiveTab, activeTab }) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleItemClick = (key) => {
    if (key === "toggle-theme") {
      toggleTheme();
    } else if (key === "logout") {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        confirmButtonColor: "#d32f2f",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          navigate("/login");
        }
      });
    } else {
      setActiveTab(key);
    }
  };

  const menuItems = [
    { text: "Personal Information", icon: <PersonIcon />, key: "personal" },
    { text: "Settings", icon: <SettingsIcon />, key: "settings" },
    { text: "Change Password", icon: <LockIcon />, key: "change-password" },
    { text: "Payment", icon: <PaymentIcon />, key: "payment" },
  ];

  const extraItems = [
    { text: "Dark Mode", icon: <Brightness4Icon />, key: "toggle-theme" },
    { text: "Logout", icon: <LogoutIcon />, key: "logout" },
  ];

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        bgcolor: mode === "dark" ? "#121212" : "white",
        color: mode === "dark" ? "white" : "black",
        p: 3,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src="https://tse1.mm.bing.net/th?id=OIP.fu5mCwl95AHkzT5ibPTsyAHaHa&pid=Api&P=0&h=180"
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 1,
            border: `2px solid ${theme.palette.divider}`,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Francois
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Full Stack Developer
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
          <IconButton>
            <GoogleIcon sx={{ color: "#DB4437" }} />
          </IconButton>
          <IconButton>
            <Facebook sx={{ color: "#1877F2" }} />
          </IconButton>
          <IconButton>
            <Apple sx={{ color: mode === "dark" ? "white" : "black" }} />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <Typography variant="h6">86</Typography>
          <Typography variant="caption" color="text.secondary">
            Post
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">40</Typography>
          <Typography variant="caption" color="text.secondary">
            Project
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">4.5K</Typography>
          <Typography variant="caption" color="text.secondary">
            Members
          </Typography>
        </Grid>
      </Grid>

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.key}
            selected={activeTab === item.key}
            onClick={() => handleItemClick(item.key)}
            sx={{
              bgcolor:
                activeTab === item.key
                  ? theme.palette.action.selected
                  : "transparent",
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: mode === "dark" ? "white" : "black" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        {extraItems.map((item) => (
          <ListItem
            button
            key={item.key}
            onClick={() => handleItemClick(item.key)}
            sx={{
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ color: mode === "dark" ? "white" : "black" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

SideProfile.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default SideProfile;
