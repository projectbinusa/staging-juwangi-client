// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import ProductCard from "../../component/ProductCard";
import { Container, Grid, Typography, TextField, Box, Button, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    category: "Cameras"
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
    category: "Laptops"
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
    category: "Smartphones"
  }
];

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // Fetch categories from backend
    const response = await axios.get("http://localhost:4322/api/categories");
    setCategories(response.data);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
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
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/categories")}
        sx={{ marginBottom: 2 }}
      >
        ADD CATEGORIES
      </Button>

      <Box mb={3} display="flex" alignItems="center" gap={2}>
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
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ bgcolor: "white", borderRadius: "5px", width: "200px" }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.kategori}>
              {category.kategori}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" sx={{ height: "56px" }}>
          <SearchIcon />
        </Button>
      </Box>

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
