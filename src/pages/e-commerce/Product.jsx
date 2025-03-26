// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";

const Product = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const { openDrawer = true } = outletContext;
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
        setProducts(response.data);
      } catch (err) {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Gagal mengambil kategori");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" ||
          item.kategori?.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [products, searchTerm, selectedCategory]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        width: "100%",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" marginLeft="150px" gutterBottom>
        Products
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" gap={2}>
          <TextField
            variant="outlined"
            placeholder="Search product..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "300px", borderRadius: "5px" }}
          />
          <Button variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </Box>

        <Box>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            sx={{ width: "200px", marginRight: "-80px", borderRadius: "5px" }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.kategori}>
                {category.kategori}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredProducts.length > 0 ? (
        <Grid container spacing={25} justifyContent="center">
          {filteredProducts.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
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
        <Typography variant="h6">Tidak ada produk tersedia</Typography>
      )}
    </Container>
  );
};

export default Product;
