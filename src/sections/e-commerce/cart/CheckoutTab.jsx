// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Container, Typography, Tabs, Tab, Box } from "@mui/material";
import Cart from "./Cart";
import ShippingInfo from "./ShippingInfo";
import Payment from "./Payment";

const CheckoutTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable">
        <Tab label="Cart" />
        <Tab label="Shipping Information" />
        <Tab label="Payment" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && <Cart />}
        {tabIndex === 1 && <ShippingInfo />}
        {tabIndex === 2 && <Payment />}
      </Box>
    </Container>
  );
};

export default CheckoutTab;
