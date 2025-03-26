// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Checkbox,
  Box,
} from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { API_DUMMY } from "../utils/api";
import Swal from "sweetalert2";

const ProductCard = ({ id, onSelect, selected, showCheckbox }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const addToCart = async () => {
    if (!product) return;

    try {
      await axios.post(`${API_DUMMY}/api/cart/add/${product.id}`);
      Swal.fire({
        icon: "success",
        title: "Berhasil menambahkan produk ke keranjang",
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Gagal menambahkan produk ke keranjang",
        timer: 1500,
      });
    }
  };

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <MuiCard
      sx={{
        width: 260,
        p: 2,
        boxShadow: theme.palette.mode === "dark" ? 5 : 2,
        borderRadius: "12px",
        transition: "all 0.3s ease-in-out",
        position: "relative",
        bgcolor: theme.palette.background.paper,
        "&:hover": { boxShadow: 20, transform: "scale(1.03)" },
      }}
    >
      {showCheckbox && (
        <Checkbox
          checked={selected}
          onChange={() => onSelect(id)}
          sx={{ position: "absolute", top: 8, left: 8 }}
        />
      )}

      {product?.gambar &&
      product.gambar !== "string" &&
      product.gambar.trim() !== "" ? (
        <CardMedia
          component="img"
          sx={{
            width: 80,
            height: 170,
            borderRadius: "12px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)" },
          }}
          image={product.gambar}
          alt={product.nama}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: theme.palette.mode === "dark" ? "#424242" : "#eeeeee",
            borderRadius: "12px",
          }}
        >
          <ShoppingBagOutlined sx={{ fontSize: 80, color: "#9e9e9e" }} />
        </Box>
      )}

      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            textAlign: "center",
          }}
        >
          {product?.nama || "Nama Produk"}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#4caf50",
            mt: 1,
            textAlign: "center",
          }}
        >
          Rp {product?.harga?.toLocaleString("id-ID") || "0"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: theme.palette.text.secondary,
            mt: 1,
          }}
        >
          {product?.deskripsi || "Tidak ada deskripsi"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontWeight: "bold",
            textAlign: "center",
            color: product?.stok > 0 ? "#388E3C" : "#D32F2F",
          }}
        >
          Stok: {product?.stok > 0 ? product.stok : "Habis"}
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={addToCart}
            sx={{
              bgcolor: "#2196f3",
              color: "white",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px",
              transition: "all 0.3s ease-in-out",
              "&:hover": { bgcolor: "#1976d2", transform: "scale(1.05)" },
            }}
          >
            Add To Cart
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default ProductCard;
