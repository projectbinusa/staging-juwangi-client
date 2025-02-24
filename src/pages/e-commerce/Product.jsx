// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import ProductCard from "../../component/ProductCard";
import { Container, Grid, Typography, TextField, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  {
    id: 1,
    name: "Canon EOS 1500D 24.1 Digital",
    brand: "Canon",
    price: "$12.99",
    oldPrice: "$15.99",
    discount: "30%",
    rating: 4.5,
    image: "/assets/canon-camera.png",
  },
  {
    id: 2,
    name: "Apple MacBook Pro",
    brand: "Apple",
    price: "$14.59",
    oldPrice: "$36",
    discount: "20%",
    rating: 4.6,
    image: "/assets/macbook.png",
  },
  {
    id: 3,
    name: "Apple iPhone 13 Mini",
    brand: "Apple",
    price: "$86.99",
    oldPrice: "$399",
    discount: "70%",
    rating: 4.7,
    image: "/assets/iphone-13-mini.png",
  },
];

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      maxWidth={false} // Menghapus batasan bawaan Material-UI
      sx={{
        position: "absolute", // Pastikan container menutupi seluruh layar
        top: 0,
        left: 0,
        width: "100vw", // Full lebar
        height: "100vh", // Full tinggi
        bgcolor: "#121212",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start", // Tetap di atas
        overflowY: "auto", // Tambahkan scroll vertikal jika perlu
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Input Pencarian */}
      <Box mb={3} display="flex" alignItems="center" gap={1}>
        <TextField
          variant="outlined"
          placeholder="Search product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "300px",
            bgcolor: "white",
            borderRadius: "5px",
          }}
        />
        <Button variant="contained" color="primary" sx={{ height: "56px" }}>
          <SearchIcon />
        </Button>
      </Box>

      {/* Grid Produk */}
      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Product not found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Product;
