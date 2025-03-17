// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import CircularLoader from '../../../component/CircularLoader';
import Cart from './Cart';
import { API_DUMMY } from '../../../utils/api';
// import CartEmpty from './CartEmpty';
// import ShippingInfo from './ShippingInfo';
// import Payment from './Payment';

const CheckoutTab = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  // Ambil data cart dari backend
  useEffect(() => {
    axios.get(`${API_DUMMY}/api/cart`)
      .then(response => {
        setCart(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cart:", err);
        setError("Gagal mengambil data cart");
        setLoading(false);
      });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    
  };

  if (loading) return <CircularLoader text="Loading cart..." />;
  if (error) return <Typography color="error">{error}</Typography>;



  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable">
        <Tab label="Cart" />
        <Tab label="Shipping Information" />
        <Tab label="Payment" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && (
          <Cart
            checkout={cart}
            
          />
        )}
        {/* {tabIndex === 1 && <ShippingInfo />}
        {tabIndex === 2 && <Payment />} */}
      </Box>
    </Container>
  );
};

export default CheckoutTab;
