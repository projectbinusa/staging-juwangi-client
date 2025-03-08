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

      await axios.post(`${API_DUMMY}/api/products`, {
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
        height: "75vh",
        width: "93vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // Warna latar belakang putih
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 3,
          bgcolor: "#f5f5f5", // Ubah menjadi warna abu-abu terang agar terlihat lebih rapi
          borderRadius: 2,
          color: "#000", // Ubah warna teks menjadi hitam
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
          {/* Input Nama Produk */}
          <TextField
            label="Nama Produk"
            variant="outlined"
            fullWidth
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            InputLabelProps={{ style: { color: "#000" } }} // Ubah warna label menjadi hitam
            sx={{
              input: { color: "#000" }, // Ubah warna teks input menjadi hitam
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#333" }, // Border lebih gelap
                "&:hover fieldset": { borderColor: "#1976D2" }, // Hover tetap biru
                "&.Mui-focused fieldset": { borderColor: "#1976D2" },
              },
            }}
          />

          {/* Input Harga */}
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

          {/* Input Deskripsi */}
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

          {/* Upload Gambar */}
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
                border: "1px solid #333", // Border lebih gelap untuk mode putih
                "&:hover": { borderColor: "#1976D2" }, // Hover tetap biru
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGambar(e.target.files[0])}
                style={{
                  color: "#000", // Ubah warna teks menjadi hitam
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
