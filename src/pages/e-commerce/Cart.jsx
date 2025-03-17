import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import CartTab from "../../component/CartTab";

const Cart = () => {
  const [cartItems] = useState([]);


  return (
    <Container>
      <CartTab cart={cartItems} />
    </Container>
  );
};

export default Cart;
