import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";
import CartTab from "../../component/CartTab";
import { API_DUMMY } from "../../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    axios.get(`${API_DUMMY}/api/cart`)
      .then(response => setCartItems(response.data))
      .catch(error => console.error("Error fetching cart items:", error));
  }, []);


  return (
    <Container>
      <Typography variant="h5" gutterBottom>Keranjang Belanja</Typography>
      <CartTab cart={cartItems} />
      <Button variant="contained" color="primary" fullWidth>Checkout</Button>
    </Container>
  );
};

export default Cart;
