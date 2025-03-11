import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { uploadImageToS3 } from "../../utils/UploadToS3";
import { API_DUMMY } from "../../utils/api";
import Swal from "sweetalert2";

export default function Add() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  const addData = async (e) => {
    e.preventDefault();

    if (!nama || !harga || !deskripsi) {
      Swal.fire({
        icon: "warning",
        title: "Mohon isi semua field!",
      });
      return;
    }

    try {
      let image = gambar;
      if (gambar) {
        image = await uploadImageToS3(gambar);
      }

      await axios.post(`${API_DUMMY}/api/products/add`, {
        nama,
        harga,
        deskripsi,
        gambar: image,
      });

      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan produk",
        text: error.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff", 
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 3,
          bgcolor: "#f5f5f5", 
          borderRadius: 2,
          color: "#000", 
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Tambah Produk
        </Typography>

        <Box
          component="form"
          onSubmit={addData}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Nama Produk"
            variant="outlined"
            fullWidth
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            InputLabelProps={{ style: { color: "#000" } }} 
            sx={{
              input: { color: "#000" }, 
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" }, 
                "&:hover fieldset": { borderColor: "#1976D2" }, 
                "&.Mui-focused fieldset": { borderColor: "#1976D2" },
              },
            }}
          />

          <TextField
            label="Harga"
            variant="outlined"
            fullWidth
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            InputLabelProps={{ style: { color: "#000" } }}
            sx={{
              input: { color: "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#1976D2" },
                "&.Mui-focused fieldset": { borderColor: "#1976D2" },
              },
            }}
          />

          <TextField
            label="Deskripsi"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            InputLabelProps={{ style: { color: "#000" } }}
            sx={{
              textarea: { color: "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#1976D2" },
                "&.Mui-focused fieldset": { borderColor: "#1976D2" },
              },
            }}
          />

          <Box>
            <Typography variant="body1" sx={{ mb: 1, color: "#000" }}>
              Gambar Produk
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "left",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                border: "1px solid #333", 
                "&:hover": { borderColor: "#1976D2" }, 
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGambar(e.target.files[0])}
                style={{
                  color: "#000", 
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>

          <Button type="submit" variant="contained" sx={{ bgcolor: "#1976D2" }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
