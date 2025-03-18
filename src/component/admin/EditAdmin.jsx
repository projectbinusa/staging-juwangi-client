import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";

const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin`);
      const adminData = response.data.data.find((item) => item.id === parseInt(id));

      if (adminData) {
        setAdmin({ ...adminData, password: "" }); 
      } else {
        Swal.fire("Gagal!", "Data admin tidak ditemukan.", "error").then(() => {
          navigate("/admin");
        });
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data admin.", "error").then(() => {
        navigate("/admin");
      });
    }
  };

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_DUMMY}/api/admin/${id}`, admin);
      Swal.fire("Sukses!", "Data admin berhasil diperbarui.", "success").then(() => {
        navigate("/admin");
      });
    } catch (error) {
      console.error("Error updating admin:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengupdate admin.", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <h2>Edit Admin</h2>
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
            label="Password (Opsional)"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={admin.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Simpan Perubahan
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditAdmin;
