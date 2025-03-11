import { Container, Grid } from "@mui/material";
import CartTab from "../../component/CartTab";
import CheckoutTab from "../../sections/e-commerce/checkout/CheckOutTab";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/products`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, []);

  return (
    <Container sx={{ marginTop: 3 }}>
      <Grid container spacing={3} justifyContent="center">

        <Grid item xs={12} md={8}>
          <CartTab cart={cart} />
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutTab cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
}
