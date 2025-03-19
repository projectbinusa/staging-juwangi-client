import { Grid, Box } from "@mui/material";
import CheckoutTab from "../../sections/e-commerce/cart/CheckoutTab";
import Order from "../../sections/e-commerce/cart/Order";

function Cart() {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} md={8}>
          <CheckoutTab />
        </Grid>

        <Grid item xs={12} md={4} mt={19}>
          <Order />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
