import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { API_DUMMY } from "../../../utils/api";


export default function Order() {
  const defaultProducts = [
    {
      id: 1,
      nama: "product",
      deskripsi: "Deskripsi produk ",
      harga: 0,
      kuantitas: 1,
      gambar: "https://tse4.mm.bing.net/th?id=OIP.scjNWB85DXyLTngGoTEE0wHaHa&pid=Api&P=0&h=180",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/cart`);
        if (response.data.length === 0) {
          defaultProducts(false)
        } else {
          setProducts(response.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal mengambil data produk. Menampilkan produk default.");
      }
    };

    fetchProducts();
  }, []);


  return (
    <Card 
      sx={{
        width: 350, 
        height: "70vh", 
        boxShadow: 3, 
        borderRadius: 2, 
        display: "flex", 
        flexDirection: "column"
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" fontWeight="bold">
          Order Summary
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box 
          sx={{
            flex: 1, 
            overflowY: "auto", 
            maxHeight: "40vh", 
            mt: 2, 
            pr: 1
          }}
        >
          {products.map((product, index) => (
            <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
              <Box
                component="img"
                src={product.gambar}
                alt={product.nama}
                sx={{ width: 64, height: 64, borderRadius: 1 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.nama}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.deskripsi}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                  Rp{(product.harga || 0).toLocaleString()} &nbsp; | &nbsp; {product.kuantitas || 1} item
                </Typography>
              </Box>
              <DeleteOutlineIcon color="error" sx={{ cursor: "pointer" }} />
            </Stack>
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">Total</Typography>
          <Typography variant="h6" fontWeight="bold">
            Rp{products.reduce((acc, product) => acc + (product.harga || 0) * (product.kuantitas || 1), 0).toLocaleString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
          <Button fullWidth variant="contained" color="primary">
            Process to Checkout
          </Button>

          <Button fullWidth variant="contained" color="error" startIcon={<ShoppingCartIcon />}>
            Buy Now
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
