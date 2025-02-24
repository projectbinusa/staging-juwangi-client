// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300, bgcolor: "#1e1e1e", color: "white", p: 1 }}>
      {/* Gambar Produk */}
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ borderRadius: "10px" }}
      />

      <CardContent>
        {/* Nama Produk */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>

        {/* Merek */}
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          {product.brand}
        </Typography>

        {/* Harga Produk */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#4caf50" }}>
            {product.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#888" }}
          >
            {product.oldPrice}
          </Typography>
        </Box>

        {/* Diskon */}
        <Typography
          variant="body2"
          sx={{
            bgcolor: "#F44336",
            color: "white",
            display: "inline-flex",
            px: 1,
            borderRadius: "5px",
            mt: 1,
            marginRight: "186px",
          }}
        >
          {product.discount} OFF
        </Typography>

        {/* Tombol Add to Cart */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#2196f3",
            color: "white",
            mt: 2,
            ":hover": { bgcolor: "#1976d2" },
          }}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
