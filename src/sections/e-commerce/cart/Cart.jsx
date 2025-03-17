// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Container, Button } from '@mui/material';
import CartTable from './CartTable';

const Cart = () => {

    
  return (
    <Container>
      <CartTable />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};
export default Cart;
