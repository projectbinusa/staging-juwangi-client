// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { 
  Container, Grid, Typography, TextField, Box, Button, CircularProgress, Select, MenuItem 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
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
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [deleteMode, setDeleteMode] = useState(false); 

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

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      Swal.fire("Oops!", "Pilih produk terlebih dahulu!", "warning");
      return;
    }

    const confirmDelete = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Produk yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await Promise.all(
        selectedProducts.map((id) => axios.delete(`${API_DUMMY}/api/products/${id}`))
      );
      setNama(nama.filter((item) => !selectedProducts.includes(item.id)));
      setSelectedProducts([]);
      setDeleteMode(false); 

      Swal.fire("Terhapus!", "Produk berhasil dihapus!", "success");
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      Swal.fire("Error!", "Gagal menghapus produk!", "error");
    }
  };

  return (
    <Container maxWidth={false} sx={{ textAlign: "center", padding: 1, marginLeft: 5 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box display="flex" justifyContent="center" gap={3} mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "300px", bgcolor: "#f0f0f0", borderRadius: "5px" }}
        />
        <Button variant="contained" color="primary">
          <SearchIcon />
        </Button>
        <Select
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          displayEmpty
          sx={{ width: "200px", bgcolor: "#f0f0f0", borderRadius: "5px" }}
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
          color={deleteMode ? "secondary" : "error"} 
          startIcon={<DeleteIcon />} 
          onClick={() => setDeleteMode(!deleteMode)}
          sx={{ fontWeight: "bold" }}
        >
          {deleteMode ? "Batal Hapus" : "Hapus Produk"}
        </Button>

        {deleteMode && selectedProducts.length > 0 && (
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteSelected}
            sx={{ fontWeight: "bold" }}
          >
            Hapus {selectedProducts.length} Produk
          </Button>
        )}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : filteredNama.length > 0 ? (
        <Grid container rowSpacing={2} justifyContent="center">
          {filteredNama.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={3}>
              <ProductCard 
                id={item.id} 
                onSelect={handleSelectProduct} 
                selected={selectedProducts.includes(item.id)} 
                showCheckbox={deleteMode} 
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
