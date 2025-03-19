// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Button, Stack } from "@mui/material";
import CartTable from "./CartTable";


const Cart = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        
        <CartTable sx={{ flex: 2 }} />

      </Stack>

      <Button sx={{ mt: 2 }} variant="contained" color="primary">
        Kembali
      </Button>
    </Container>
  );
};

export default Cart;
