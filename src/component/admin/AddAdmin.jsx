import { useState } from "react";
import { Container, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../utils/api";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_DUMMY}/api/admin/create`, admin);
      Swal.fire("Sukses!", "Admin berhasil ditambahkan.", "success").then(() => {
        navigate("/admin");
      });
    } catch (error) {
      console.error("Error adding admin:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan admin.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <h2>Tambah Admin</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama"
            name="username"
            fullWidth
            margin="normal"
            value={admin.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={admin.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={admin.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Tambah Admin
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddAdmin;
