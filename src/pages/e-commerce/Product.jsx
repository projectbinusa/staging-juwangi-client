// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../../component/ProductCard";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/products`);
        console.log(" Data Produk:", response.data);
        setProducts(response.data);
      } catch {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/categories`);
        console.log(" Data Kategori:", response.data);
        setCategories(response.data);
      } catch {
        console.error("Gagal mengambil kategori");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const cocokNama = item.nama?.toLowerCase().includes(searchTerm.toLowerCase());
      const cocokKategori =
        selectedCategory === "" ||
        item.kategori?.toLowerCase() === selectedCategory.toLowerCase();
      return cocokNama && cocokKategori;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Products
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        mb={4}
      >
        <Box display="flex" gap={2} flex={1}>
          <TextField
            variant="outlined"
            placeholder="Search product..."
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: "10px" }}
          />
        </Box>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{
            minWidth: "200px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
          }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.kategori}>
              {category.kategori}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : filteredProducts.length > 0 ? (
        <Grid container spacing={4}>
          {filteredProducts.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                id={item.id}
                nama={item.nama}
                harga={item.harga}
                gambar={item.gambar}
                kategori={item.kategori}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" textAlign="center">
          Tidak ada produk tersedia
        </Typography>
      )}
    </Container>
  );
};

export default Product;
