import { Grid, Box } from "@mui/material";
import CheckoutTab from "../../sections/e-commerce/cart/CheckoutTab";
import Order from "../../sections/e-commerce/cart/Order";
import { useOutletContext } from "react-router-dom";

function Cart() {
  const { openDrawer } = useOutletContext(); 
  return (
<Box sx={{ flexGrow: 1, p: 2 ,maxWidth: "100%" ,marginLeft: openDrawer ? "0px" : "20px", 
                transition: "margin 0.3s ease-in-out",}}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
      <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <CheckoutTab />
      </Box>
    </Grid>
    <Grid item xs={12} md={4} sx={{ alignSelf: "flex-start", ml: "auto" ,mt: 19 }}>
      <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Order />
      </Box>
    </Grid>
  </Grid>
</Box>
  );
}

export default Cart;
