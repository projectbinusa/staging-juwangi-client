// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Typography } from '@mui/material';
import CircularLoader from '../../component/CircularLoader';
import CheckoutTab from '../../sections/e-commerce/cart/CheckoutTab';
// import CartEmpty from '../../sections/e-commerce/cart/CartEmpty';

import { useGetCart } from '../../api/Cart';

function Cart() {
  const { cartLoading, cart, cartError } = useGetCart();

  if (cartLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularLoader text="Loading cart..." />
      </Box>
    );
  }
    
  if (cartError) {
    return <Typography color="error">Gagal memuat cart: {cartError.message}</Typography>;
  }

  // if (!cart || !cart.products || cart.products.length === 0) {
  //   return <CartEmpty/>;

  // }

  return (
    <Box>
      <CheckoutTab cart={cart} />
    </Box>
  );
}

export default Cart;
