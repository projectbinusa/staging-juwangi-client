// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    stok: "",
    gambar: null,
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
    if (e.target.name === "gambar") {
      setProduct({ ...product, gambar: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedProduct = {
        nama: product.nama,
        harga: product.harga,
        deskripsi: product.deskripsi,
        stok: product.stok,
      };

      if (product.gambar instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(product.gambar);
        reader.onloadend = async () => {
          updatedProduct.gambar = reader.result;

          await axios.put(`${API_DUMMY}/api/products/${id}`, updatedProduct, {
            headers: { "Content-Type": "application/json" },
          });

          Swal.fire({
            title: "Berhasil!",
            text: "Produk berhasil diperbarui",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => navigate("/products"));
        };
      } else {
        await axios.put(`${API_DUMMY}/api/products/${id}`, updatedProduct, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          title: "Berhasil!",
          text: "Produk berhasil diperbarui",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => navigate("/products"));
      }
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
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
        overflowY: "auto",
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
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
            label="Stok"
            name="stok"
            type="number"
            value={product.stok}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" fontWeight="bold">
              Gambar Produk
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                border: "1px dashed #333",
              }}
            >
              <input
                type="file"
                name="gambar"
                accept="image/*"
                onChange={handleChange}
                style={{ marginBottom: "10px" }}
              />
            </Box>
          </Box>

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
    </Box>
  );
};

export default EditProduct;
