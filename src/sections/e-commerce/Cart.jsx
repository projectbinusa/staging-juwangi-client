// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import MainCard from "../../component/MainCard"; 
import CircularLoader from "../../component/CircularLoader";
import { useGetCart } from "../../api/Cart"; 

const Cart = () => {
  const { cartLoading, cart } = useGetCart();

  const loader = (
    <MainCard>
      <Box sx={{ height: "calc(100vh - 310px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularLoader />
      </Box>
    </MainCard>
  );

  if (cartLoading) return loader;

  return (
    <MainCard>
      <Typography variant="h4" gutterBottom>
        Keranjang Belanja
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Keranjang kamu kosong.
        </Typography>
      ) : (
        cart.map((item) => (
          <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.quantity} x Rp{item.price.toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="h6">Rp{(item.quantity * item.price).toLocaleString()}</Typography>
          </Box>
        ))
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">
          Rp{cart.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()}
        </Typography>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Checkout
      </Button>
    </MainCard>
  );
};

export default Cart;
