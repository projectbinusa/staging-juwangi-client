import React from "react";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


const product = {
  name: "Canon EOS 1500D 24.1 Digital",
  description: "512GB ROM, MLLH3HN/A...",
  price: 399.00,
  quantity: 1,
  image: "https://example.com/camera.jpg" 
};

export default function Order() {
  const subTotal = product.price * product.quantity;
  const estimatedDelivery = 0;
  const voucherDiscount = 0;
  const total = subTotal + estimatedDelivery - voucherDiscount;

  return (
    <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Order Summary
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: 64, height: 64, borderRadius: 1 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
              ${product.price.toFixed(2)} &nbsp; | &nbsp; {product.quantity} item
            </Typography>
          </Box>
          <DeleteOutlineIcon color="error" sx={{ cursor: "pointer" }} />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Harga */}
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Sub Total</Typography>
            <Typography fontWeight="bold">${subTotal.toFixed(2)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography>Estimated Delivery</Typography>
            <Typography fontWeight="bold">${estimatedDelivery}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography>Voucher</Typography>
            <Typography fontWeight="bold">${voucherDiscount}</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Total Harga */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">Total</Typography>
          <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
        </Stack>

        {/* Tombol Checkout & Buy Now */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#0066FF" }}
          >
            Process to Checkout
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<ShoppingCartIcon />}
          >
            Buy Now
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
