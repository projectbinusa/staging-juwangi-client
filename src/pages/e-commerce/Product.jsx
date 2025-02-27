// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { Container, Grid, Typography, TextField, Box, Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add"; // Import icon plus
import axios from "axios";

const Product = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [products, setProducts] = useState([]); // Data produk dari BE
  const [searchTerm, setSearchTerm] = useState(""); // State pencarian
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.example.com/products"); // Ganti dengan API BE
        setProducts(response.data); // Simpan data dari API ke state
      } catch (err) {
        setError("Failed to fetch products"); // Tangani error jika gagal fetch data
      } finally {
        setLoading(false); // Set loading menjadi false setelah fetch selesai
      }
    };

    fetchProducts();
  }, []);

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "#121212",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Container untuk tombol tambah produk & pencarian */}
      <Box 
        mb={3} 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        width="80%"
      >
        {/* Tombol Tambah Produk di sebelah kiri */}
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<AddIcon />} // Icon plus
          onClick={() => navigate("/products/add")} // Navigasi ke /products/add
        >
          Tambah Produk
        </Button>

        {/* Input Pencarian di sebelah kanan */}
        <Box display="flex" alignItems="center" gap={1}>
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
      </Box>

      {/* Loading dan Error Handling */}
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
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
      )}
    </Container>
  );
};

export default Product;
