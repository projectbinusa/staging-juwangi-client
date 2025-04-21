// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Toolbar, Divider, Collapse, Switch, Typography, Box
} from "@mui/material";
import {
  Person, ShoppingCart, AssessmentOutlined, AssignmentIndRounded, ExitToApp,
  Menu, ChevronLeft, AccountCircle, ExpandLess, ExpandMore, Storefront,
  Brightness4, ClassOutlined, BarChart
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeContext } from "../../ThemeContext";

const Sidebar = ({ openDrawer, setOpenDrawer }) => {
  const navigate = useNavigate();
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openEcommerce, setOpenEcommerce] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const { mode, toggleTheme } = useContext(ThemeContext);

  const listItemStyle = {
    borderRadius: "8px",
    mx: 1,
    my: 0.5,
    "&:hover": {
      backgroundColor: mode === "dark" ? "#2a2a3d" : "#f0f0f0",
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: openDrawer ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: openDrawer ? 240 : 60,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          backgroundColor: mode === "dark" ? "#1E1E2F" : "#FFFFFF",
          color: mode === "dark" ? "#fff" : "#333",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          borderRight: mode === "dark" ? "1px solid #444" : "1px solid #e0e0e0",
          borderRadius: "0 12px 12px 0"
        }
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: openDrawer ? "space-between" : "center", px: 2 }}>
        {openDrawer && <Typography variant="h6">Menu</Typography>}
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: "inherit" }}>
          {openDrawer ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Divider />

      <List>
        {/* Dashboard */}
        <ListItemButton onClick={() => setOpenDashboard(!openDashboard)} sx={listItemStyle}>
          <ListItemIcon sx={{ color: "inherit" }}><AssessmentOutlined /></ListItemIcon>
          {openDrawer && <ListItemText primary="Dashboard" />}
          {openDrawer && (openDashboard ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openDashboard && openDrawer} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/analytics")}><ListItemText primary="Analytics" /></ListItemButton>
            <ListItemButton onClick={() => navigate("/data")}><ListItemText primary="Data" /></ListItemButton>
          </Box>
        </Collapse>

        {/* E-commerce */}
        <ListItemButton onClick={() => setOpenEcommerce(!openEcommerce)} sx={listItemStyle}>
          <ListItemIcon sx={{ color: "inherit" }}><Storefront /></ListItemIcon>
          {openDrawer && <ListItemText primary="E-commerce" />}
          {openDrawer && (openEcommerce ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openEcommerce && openDrawer} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/products")}><ListItemText primary="Produk" /></ListItemButton>
            <ListItemButton onClick={() => navigate("/productlist")}><ListItemText primary="Produk List" /></ListItemButton>
            <ListItemButton onClick={() => navigate("/addproduct")}><ListItemText primary="Tambah Produk" /></ListItemButton>
            <ListItemButton onClick={() => navigate("/cart")}><ListItemText primary="Cart" /></ListItemButton>
          </Box>
        </Collapse>

        {/* Invoice */}
        <ListItemButton onClick={() => setOpenInvoice(!openInvoice)} sx={listItemStyle}>
          <ListItemIcon sx={{ color: "inherit" }}><ClassOutlined /></ListItemIcon>
          {openDrawer && <ListItemText primary="Invoice" />}
          {openDrawer && (openInvoice ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openInvoice && openDrawer} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/createinvoice")}><ListItemText primary="Create" /></ListItemButton>
            <ListItemButton onClick={() => navigate("/listinvoice")}><ListItemText primary="List" /></ListItemButton>
          </Box>
        </Collapse>

        {/* Other Menu */}
        {[
          { text: "Chart", icon: <BarChart />, path: "/chart" },
          { text: "Ordered", icon: <ShoppingCart />, path: "/orders" },
          { text: "Customer", icon: <AssignmentIndRounded />, path: "/user" },
          { text: "Admin", icon: <Person />, path: "/admin" },
          { text: "Profil", icon: <AccountCircle />, path: "/profile" },
          { text: "Logout", icon: <ExitToApp />, path: "/login" },
        ].map((item, i) => (
          <ListItem disablePadding key={i}>
            <ListItemButton onClick={() => navigate(item.path)} sx={listItemStyle}>
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              {openDrawer && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}

        {/* Mode Switch */}
        <ListItem disablePadding>
          <ListItemButton sx={listItemStyle}>
            <ListItemIcon sx={{ color: "inherit" }}><Brightness4 /></ListItemIcon>
            {openDrawer && <Typography sx={{ flexGrow: 1 }}>Mode</Typography>}
            <Switch checked={mode === "dark"} onChange={toggleTheme} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  setOpenDrawer: PropTypes.func.isRequired,
};

export default Sidebar;
