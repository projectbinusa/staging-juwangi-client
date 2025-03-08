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
        height: "100vh", // Full tinggi layar
        width: "100vw",
        display: "flex",
        justifyContent: "center", // Pusatkan horizontal
        alignItems: "center", // Pusatkan vertikal
        backgroundColor: "#121212",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 3,
          bgcolor: "#1e1e1e",
          borderRadius: 2,
          color: "#fff",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Form Tambah Produk
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
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
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
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
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
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              input: { color: "#fff" },
              "& .MuiInputBase-inputMultiline": { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <h5 style={{ margin: 0 }}>Gambar</h5>
            <TextField
              label=""
              variant="outlined"
              fullWidth
              type="file"
              onChange={(e) => setGambar(e.target.files[0])}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#90caf9" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
              }}
            />
          </Box>

          <Button type="submit" variant="contained" sx={{ bgcolor: "#1976D2" }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
