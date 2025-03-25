// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const ErrorImage = styled("img")({
  maxWidth: "80%", 
  maxHeight: "300px",
  height: "auto",
  marginBottom: "20px",
  marginLeft: "20px",
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
    "100%": { transform: "translateY(0px)" },
  },
});

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "100px",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <ErrorImage 
        src="https://www.bing.com/th/id/OGC.b68bd5f85e437b26a2d39c0baa64fa0c?pid=1.7&rurl=https%3a%2f%2fcdn.pixabay.com%2fanimation%2f2023%2f03%2f29%2f10%2f53%2f10-53-26-16_512.gif&ehk=xXoj0G2KWuUE9oAOqw28B4b3ZwtWDmkoABZ6OgcpmQY%3d" 
        alt="404 Error"
      />
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: "bold", 
          color: theme.palette.mode === "dark" ? "#FF5252" : "error.main",
        }} 
        gutterBottom
      >
        404 - Halaman Tidak Ditemukan
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: theme.palette.text.secondary, 
          mb: 4 
        }}
      >
        Maaf, halaman yang Anda cari tidak tersedia. Coba cek URL atau kembali ke beranda.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        sx={{ 
          padding: "12px 24px", 
          borderRadius: "30px", 
          boxShadow: 3,
          "&:hover": {
            backgroundColor: "primary.dark",
            boxShadow: 6,
          }
        }}
        onClick={() => navigate("/")}
      >
        Kembali ke Beranda
      </Button>
      <Box sx={{ mt: 4, color: theme.palette.text.secondary }}>
        <Typography variant="body2">
          Jika Anda membutuhkan bantuan lebih lanjut, hubungi kami.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
