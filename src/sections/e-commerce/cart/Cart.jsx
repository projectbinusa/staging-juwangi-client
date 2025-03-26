// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Button, Stack } from "@mui/material";
import CartTable from "./CartTable";


const Cart = () => {
  return (
    <Container>
      <Stack direction="row" alignItems="flex-start">

        <CartTable  />

      </Stack>

      <Button sx={{ mt: 2 }} variant="contained" color="primary">
        Kembali
      </Button>
    </Container>
  );
};

export default Cart;
