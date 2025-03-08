// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../utils/api"; 

const ProductCard = ({ id }) => {  
  const [nama, setNama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNama = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/products/${id}`); // Tambah /
        setNama(response.data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchNama();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card sx={{ maxWidth: 300, bgcolor: "#fff", color: "#000", p: 1, boxShadow: 3 }}>
      {/* Gambar Produk */}
      <CardMedia
        component="img"
        height="200"
        image={nama?.gambar || ""}
        alt={nama?.nama || "Product Image"}
        sx={{ borderRadius: "10px" }}
      />

      <CardContent>
        {/* Nama Produk */}
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {nama?.nama || "Nama Produk"}
        </Typography>

        {/* Harga Produk */}
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#4caf50", mt: 1 }}>
          Rp {nama?.harga?.toLocaleString("id-ID") || "0"}
        </Typography>

        {/* Deskripsi Produk */}
        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
          {nama?.deskripsi || "Tidak ada deskripsi"}
        </Typography>

        {/* Tombol Add to Cart */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#2196f3",
            color: "white",
            mt: 2,
            ":hover": { bgcolor: "#1976d2" },
          }}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
