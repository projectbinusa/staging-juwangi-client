// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", path: "/register" },
    { text: "Products", path: "/products" },
    { text: "Add Product", path: "/addproduct" },  
    { text: "Categories", path: "/categories" }, 
    { text: "Profile", path: "/profile" }, 
    { text: "User", path: "/user" },  
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => { navigate(item.path); onClose(); }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;