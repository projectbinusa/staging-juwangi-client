// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", // Pastikan tingginya penuh viewport
        textAlign: "center",
        marginLeft: "240px"
      }}
    >
      <Box>
        <Typography variant="h3" color="error" gutterBottom>
          404 - Halaman Tidak Ditemukan
        </Typography>
        <Typography variant="h6" gutterBottom>
          Maaf, halaman yang Anda cari tidak tersedia.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/")} 
          sx={{ mt: 2 }}
        > 
          Kembali ke Beranda
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
