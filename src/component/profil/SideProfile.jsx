import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import { Facebook, Apple } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import PropTypes from "prop-types";

const SideProfile = ({ setActiveTab, activeTab }) => {
  const theme = useTheme(); 
  const { mode } = useContext(ThemeContext); 
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
      {/* Avatar & Info */}
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

        {/* Media Sosial */}
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

      {/* Statistik */}
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

      {/* Menu Sidebar */}
      <List>
        {[
          { text: "Personal Information", icon: <PersonIcon />, key: "personal" },
          { text: "Settings", icon: <SettingsIcon />, key: "settings" },
          { text: "Change Password", icon: <LockIcon />, key: "change-password" },
          { text: "Payment", icon: <PaymentIcon />, key: "payment" },
        ].map((item) => (
          <ListItem
            button
            key={item.key}
            selected={activeTab === item.key}
            onClick={() => setActiveTab(item.key)}
            sx={{
              bgcolor: activeTab === item.key ? theme.palette.action.selected : "transparent",
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
