import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.example.com/products", product);
      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 1500,
      });
      setProduct({ name: "", price: "", description: "", imageUrl: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan produk!",
        text: error.message,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, bgcolor: "#1e1e1e", borderRadius: 2 }}>
        <Typography variant="h5" color="white" align="center" gutterBottom>
          Tambah Produk
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nama Produk"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{ input: { color: "#fff" } }}
          />
          <TextField
            fullWidth
            label="Harga"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{ input: { color: "#fff" } }}
          />
          <TextField
            fullWidth
            label="Deskripsi"
            name="description"
            value={product.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{ input: { color: "#fff" } }}
          />
          <TextField
            fullWidth
            label="URL Gambar"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{ input: { color: "#fff" } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#1976D2", textTransform: "uppercase" }}
          >
            Tambah Produk
          </Button>
        </form>
      </Box>
    </Container>
  );
}
