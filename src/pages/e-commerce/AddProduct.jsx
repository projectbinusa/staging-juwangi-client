import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { uploadImageToS3 } from "../../utils/UploadToS3";
import { API_DUMMY } from "../../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const addData = async (e) => {
    e.preventDefault();

    if (!nama || !harga || !deskripsi || !stok) {
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
        stok,
        gambar: image,
      });

      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/productlist");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan produk!",
        text: error.message || "Terjadi kesalahan.",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "900px",
        display: "flex",
        marginLeft: "230px",
        padding: 4,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tambah Produk
        </Typography>

        <Box
          component="form"
          onSubmit={addData}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "left",
          }}
        >
          <TextField
            label="Nama Produk"
            variant="outlined"
            fullWidth
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <TextField
            label="Harga"
            variant="outlined"
            fullWidth
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
          />

          <TextField
            label="Deskripsi"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />

          <TextField
            label="Stok"
            variant="outlined"
            fullWidth
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
          />

          <Box>
            <Typography variant="body1" fontWeight="bold">
              Gambar Produk
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                borderRadius: "5px",
                border: "1px dashed #333",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "10px" }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#1976D2",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {},
            }}
          >
            Tambah Produk
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
