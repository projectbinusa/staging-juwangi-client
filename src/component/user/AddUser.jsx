import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    kontak: "",
    umur: "",
    negara: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["username", "email", "password", "kontak", "umur", "negara"];
    const isEmpty = requiredFields.some((field) => !user[field]);

    if (isEmpty) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    try {
      await axios.post(`${API_DUMMY}/api/users/register`, user);

      Swal.fire({
        icon: "success",
        title: "User Berhasil Ditambahkan!",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (err) {
      console.error("Error adding user:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan user!",
        text: "Coba lagi nanti.",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 2,
          marginLeft: 40,
          borderRadius: 3,
          backgroundColor: "background.default",
          boxShadow: (theme) =>
            theme.palette.mode === "dark" ? "0 0 10px rgba(255,255,255,0.1)" : "0 0 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="text.primary"
          >
            Tambah User Baru
          </Typography>
  
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={user.username}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={user.password}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Kontak"
              name="kontak"
              fullWidth
              margin="normal"
              value={user.kontak}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Umur"
              type="number"
              name="umur"
              fullWidth
              margin="normal"
              value={user.umur}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Negara"
              name="negara"
              fullWidth
              margin="normal"
              value={user.negara}
              onChange={handleChange}
              variant="outlined"
            />
  
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={user.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="Pending">Pelajar</MenuItem>
                <MenuItem value="Verified">Remaja</MenuItem>
                <MenuItem value="Rejected">Lansia</MenuItem>
              </Select>
            </FormControl>
  
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/user")}
                sx={{
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Simpan
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );  
};

export default AddUser;
