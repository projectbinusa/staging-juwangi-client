// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { 
  Container, Grid, Typography, TextField, Box, Button, CircularProgress, Select, MenuItem 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add"; 
import axios from "axios";
import { API_DUMMY } from "../../utils/api";

const Product = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedCategories, setSelectedCategories] = useState(""); 
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchNama = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/products`);
        setNama(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };

    fetchNama();
    fetchCategories();
  }, []);

  // ✅ Filtering data
  const filteredNama = nama.filter((item) =>
    item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories === "" || item.kategori === selectedCategories)
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
        bgcolor: "#fff",
        color: "#000",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        overflowY: "auto",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        width="100%"
        maxWidth="1200px"
        mb={2}
      >
        {/* Tombol Tambah Produk di kiri */}
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => navigate("/addproduct")} 
        >
          Tambah Produk
        </Button>

        {/* Pencarian dan Kategori */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Input Pencarian */}
          <TextField
            variant="outlined"
            placeholder="Search product..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "300px",
              bgcolor: "#f0f0f0",
              borderRadius: "5px",
            }}
          />
          <Button variant="contained" color="primary">
            <SearchIcon />
          </Button>

          {/* Box untuk Kategori + Tombol Add Category */}
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            {/* Dropdown Kategori */}
            <Select
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              displayEmpty
              sx={{ bgcolor: "#f0f0f0", borderRadius: "5px", width: "200px" }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.kategori}>
                  {category.kategori}
                </MenuItem>
              ))}
            </Select>

            {/* Tombol ADD CATEGORIES */}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate("/categories")}
            >
              ADD CATEGORIES
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Loading dan Error */}
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredNama.length > 0 ? (
            filteredNama.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard id={item.id} />  {/* ✅ Perbaikan: kirim id ke ProductCard */}
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
