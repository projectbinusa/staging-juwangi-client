// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300, bgcolor: "#1e1e1e", color: "white", p: 1 }}>
      {/* Gambar Produk */}
      <CardMedia
        component="img"
        height="200"
        image={product.gambar} // Menggunakan gambar dari produk
        alt={product.produk}
        sx={{ borderRadius: "10px" }}
      />

      <CardContent>
        {/* Nama Produk */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {product.produk}
        </Typography>

        {/* Harga Produk */}
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#4caf50", mt: 1 }}>
          Rp {product.harga}
        </Typography>

        {/* Deskripsi Produk */}
        <Typography variant="body2" sx={{ color: "#aaa", mt: 1 }}>
          {product.deskripsi}
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
