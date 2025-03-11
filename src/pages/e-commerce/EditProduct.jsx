import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { API_DUMMY } from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    gambar: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_DUMMY}/api/products/${id}`, product);

      // Menampilkan popup SweetAlert2 dengan tombol OK
      Swal.fire({
        title: "Berhasil!",
        text: "Produk berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/products"); // Redirect ke halaman produk setelah klik OK
        }
      });

    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengedit produk",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Pusatkan vertikal
        marginLeft: "380px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 3,
          boxShadow: 3,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Edit Produk
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Produk"
            name="nama"
            value={product.nama}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Harga"
            name="harga"
            type="number"
            value={product.harga}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Deskripsi"
            name="deskripsi"
            value={product.deskripsi}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="URL Gambar"
            name="gambar"
            value={product.gambar}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: "#2196f3", color: "white" }}
            fullWidth
          >
            Simpan Perubahan
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditProduct;
