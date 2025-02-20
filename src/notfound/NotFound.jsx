// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

const ErrorImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginBottom: '20px',
});

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50vh', 
        width: '400vh',
        textAlign: 'center', 
        flexDirection: 'column', 
        marginLeft: '60px',
      }}
    >
      <ErrorImage 
        src="https://undraw.co/404.svg" 
        alt="404 Error"
      />
      
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
