// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="h6" gutterBottom>
        Maaf, halaman yang Anda cari tidak tersedia.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}> 
        Kembali ke Beranda
      </Button>
    </Container>
  );
};

export default NotFound;
