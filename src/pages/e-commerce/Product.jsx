import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  const outletContext = useOutletContext() || {};
  const { openDrawer = true } = outletContext;
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

  const filteredNama = useMemo(() => {
    return nama.filter((item) =>
      item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories === "" || item.kategori?.toLowerCase() === selectedCategories.toLowerCase())
    );
  }, [nama, searchTerm, selectedCategories]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
        color: "#000",
        overflowY: "auto",
        transition: "all 0.3s ease-in-out",
        ml: openDrawer ? "30px" : "120px",
        width: openDrawer ? "calc(130% - 220px)" : "calc(130% - 50px)",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* Bagian atas dengan tombol dan filter */}
      <Box 
        display="flex" 
        flexDirection="column"
        alignItems="center" 
        justifyContent="center" 
        width="100%"
        maxWidth="1200px"
        gap={3}
        mb={3}
      >
        {/* Tombol tambah produk */}
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />} 
          onClick={() => navigate("/addproduct")} 
          sx={{ width: "200px", fontWeight: "bold" }}
        >
          Tambah Produk
        </Button>

        {/* Search dan Filter */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} width="100%">
          <TextField
            variant="outlined"
            placeholder="Search product..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "300px",
              bgcolor: "#f0f0f0",
              borderRadius: "5px",
              transition: "all 0.2s ease-in-out",
              "&:focus-within": {
                bgcolor: "#e0e0e0",
              },
            }}
          />
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              minWidth: "50px", 
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <SearchIcon />
          </Button>

          <Select
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: "#f0f0f0",
              borderRadius: "5px",
              width: "200px",
              transition: "all 0.2s ease-in-out",
              "&:focus-within": {
                bgcolor: "#e0e0e0",
              },
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.kategori}>
                {category.kategori}
              </MenuItem>
            ))}
          </Select>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/categories")}
            sx={{
              width: "200px",
              fontWeight: "bold",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            ADD CATEGORIES
          </Button>
        </Box>
      </Box>

      {/* Daftar Produk */}
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredNama.length > 0 ? (
        <Grid container spacing={4} justifyContent="center">
          {filteredNama.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard id={item.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
          Tidak ada produk tersedia
        </Typography>
      )}
    </Container>
  );
};

export default Product;
