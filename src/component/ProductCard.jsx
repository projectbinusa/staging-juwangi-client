// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { API_DUMMY } from "../utils/api";

const ProductCard = ({ id }) => {  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Untuk navigasi ke halaman edit

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    navigate(`/editproduct/${id}`); 
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card 
      sx={{ 
        maxWidth: 230, 
        bgcolor: "#fff", 
        color: "#000", 
        p: 1, 
        boxShadow: 3,
        borderRadius: "10px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
        }
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={product?.gambar || ""}
        alt={product?.nama || "Product Image"}
        sx={{ 
          borderRadius: "10px", 
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.08)",
          },
        }}
      />

      <CardContent>
        <Typography variant="body1" component="div" sx={{ fontWeight: "bold" }}>
          {product?.nama || "Nama Produk"}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#4caf50", mt: 1 }}>
          Rp {product?.harga?.toLocaleString("id-ID") || "0"}
        </Typography>

        <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
          {product?.deskripsi || "Tidak ada deskripsi"}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#2196f3",
            color: "white",
            mt: 1,
            borderRadius: "8px",
            fontSize: "12px",
            padding: "6px 10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": { bgcolor: "#1976d2", transform: "scale(1.05)" },
          }}
        >
          Add To Cart
        </Button>

        {/* Tombol Edit */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleEdit} // Fungsi edit
          sx={{
            bgcolor: "#ff9800",
            color: "white",
            mt: 1,
            borderRadius: "8px",
            fontSize: "12px",
            padding: "6px 10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": { bgcolor: "#f57c00", transform: "scale(1.05)" },
          }}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
