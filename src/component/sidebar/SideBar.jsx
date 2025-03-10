// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
} from "@mui/material";
import {  
  Person,
  ShoppingCart,
  AssessmentOutlined,
  ExitToApp,
  Menu,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Storefront,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ openDrawer, setOpenDrawer }) => {
  const navigate = useNavigate();
  const [openEcommerce, setOpenEcommerce] = useState(false);

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
          backgroundColor: "#1976D2",
          color: "#fff",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: openDrawer ? "space-between" : "center" }}>
        {openDrawer && <h3 style={{ margin: 0 }}>Menu</h3>}
        <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ color: "white" }}>
          {openDrawer ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Divider />

      <List>    

       {/* Menu Dashboard */}
       <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/products")}>
            <ListItemIcon sx={{ color: "white" }}>
              <AssessmentOutlined />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Dashboard" />}
          </ListItemButton>
        </ListItem>

          {/* Submenu e-commerce */}
          <List component="div" disablePadding>
            <ListItemButton onClick={() => setOpenEcommerce(!openEcommerce)} sx={{ pl: 2 }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="E-commerce" />
              {openEcommerce ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openEcommerce} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton onClick={() => navigate("/products")}>
                  <ListItemIcon sx={{ color: "white" }}>
                  </ListItemIcon>
                  <ListItemText primary="Produk" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/")}>
                  <ListItemIcon sx={{ color: "white" }}>
                  </ListItemIcon>
                  <ListItemText primary="Tambah Produk" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/")}>
                  <ListItemIcon sx={{ color: "white" }}>
                  </ListItemIcon>
                  <ListItemText primary="Edit Produk" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>

          <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/user")}>
            <ListItemIcon sx={{ color: "white" }}>
              <ShoppingCart />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Pesanan" />}
          </ListItemButton>
        </ListItem>

        {/* Menu lainnya */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon sx={{ color: "white" }}>
              <Person />
            </ListItemIcon>
            {openDrawer && <ListItemText primary="Profil" />}
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
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  setOpenDrawer: PropTypes.func.isRequired,
};

export default Sidebar;
