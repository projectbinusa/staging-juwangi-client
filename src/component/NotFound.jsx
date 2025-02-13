// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

// Styling custom menggunakan styled components dari MUI
const ErrorImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '20px',
});

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      {/* Gambar Ilustrasi untuk 404 */}
      <ErrorImage src="https://static.vecteezy.com/system/resources/previews/023/404/856/original/3d-icon-yellow-robot-sad-png.pnge.com/404-illustration.png" alt="" />
      
      <Typography variant="h3" color="error" sx={{ fontWeight: 'bold' }} gutterBottom>
        404 - Halaman Tidak Ditemukan
      </Typography>
      
      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
        Maaf, halaman yang Anda cari tidak tersedia. Coba cek URL atau kembali ke beranda.
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        sx={{ 
          padding: '12px 24px', 
          borderRadius: '30px', 
          boxShadow: 3,
          '&:hover': {
            backgroundColor: 'primary.dark',
            boxShadow: 6,
          }
        }}
        onClick={() => navigate("/")}
      >
        Kembali ke Beranda
      </Button>
      
      <Box sx={{ mt: 4, color: 'text.secondary' }}>
        <Typography variant="body2">
          Jika Anda membutuhkan bantuan lebih lanjut, hubungi kami.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
