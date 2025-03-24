// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Divider,
  Collapse,
  Switch,
  Typography,
} from "@mui/material";
import {
  Person,
  ShoppingCart,
  AssessmentOutlined,
  AssignmentIndRounded,
  ExitToApp,
  Menu,
  ChevronLeft,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Storefront,
  Brightness4,
  ClassOutlined,
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
          backgroundColor: mode === "dark" ? "#333" : "#1976D2",
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

        <ListItemButton onClick={() => setOpenDashboard(!openDashboard)} sx={{ pl: openDrawer ? 2 : 1.5 }}>
          <ListItemIcon sx={{ color: "white" }}>
            <AssessmentOutlined />
          </ListItemIcon>
          {openDrawer && <ListItemText primary="Dashboard" />}
          {openDrawer && (openDashboard ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openDashboard && openDrawer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/analytics")}> 
              <ListItemText primary="Analytics" />
            </ListItemButton> 
          </List>
        </Collapse>
        <Collapse in={openDashboard && openDrawer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/data")}> 
              <ListItemText primary="Data" />
            </ListItemButton> 
          </List>
        </Collapse>

        <ListItemButton onClick={() => setOpenEcommerce(!openEcommerce)} sx={{ pl: openDrawer ? 2 : 1.5 }}>
          <ListItemIcon sx={{ color: "white" }}>
            <Storefront />
          </ListItemIcon>
          {openDrawer && <ListItemText primary="E-commerce" />}
          {openDrawer && (openEcommerce ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openEcommerce && openDrawer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/products")}> 
              <ListItemText primary="Produk" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/addproduct")}> 
              <ListItemText primary="Tambah Produk" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/cart")}> 
              <ListItemText primary="Cart" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpenInvoice(!openInvoice)} sx={{ pl: openDrawer ? 2 : 1.5 }}>
          <ListItemIcon sx={{ color: "white" }}>
            <ClassOutlined />
          </ListItemIcon>
          {openDrawer && <ListItemText primary="Invoice" />}
          {openDrawer && (openInvoice ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        <Collapse in={openInvoice && openDrawer} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => navigate("/createinvoice")}> 
              <ListItemText primary="Create" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/listinvoice")}>
              <ListItemText primary="List " />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/chart")}>
            <ListItemIcon sx={{ color: "white" }}>
              <ShoppingCart />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Chart" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/orders")}>
            <ListItemIcon sx={{ color: "white" }}>
              <ShoppingCart />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Ordered" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/user")}>
            <ListItemIcon sx={{ color: "white" }}>
              <AssignmentIndRounded />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Customer" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Brightness4 />
            </ListItemIcon>
            {openDrawer && <Typography sx={{ flexGrow: 1 }}>Mode</Typography>}
            <Switch checked={mode === "dark"} onChange={toggleTheme} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/admin")}>
            <ListItemIcon sx={{ color: "white" }}>
              <Person />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Admin" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/login")}>
            <ListItemIcon sx={{ color: "white" }}>
              <ExitToApp />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon sx={{ color: "white" }}>
              <AccountCircle />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Profil" />}
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