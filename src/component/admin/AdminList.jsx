import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../utils/api";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin`);
      if (Array.isArray(response.data.data)) {
        setAdmins(response.data.data);
      } else {
        setAdmins([]);
        console.error("Format data API tidak sesuai");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus admin ini?",
      text: "Data akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_DUMMY}/api/admin/${id}`);
          setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
          Swal.fire("Dihapus!", "Admin berhasil dihapus.", "success");
        } catch (error) {
          console.error("Error deleting admin:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginLeft: 10 , m: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Daftar Admin</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/addadmin")}
          sx={{ textTransform: "none", fontSize: "16px" }}
        >
          Tambah Admin
        </Button>
      </Box>

      <TextField
        label="Cari Admin"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins
              .filter((admin) => admin.username.toLowerCase().includes(search.toLowerCase()))
              .map((admin, index) => (
                <TableRow key={admin.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell align="center">
                    <IconButton color="warning" onClick={() => navigate(`/editadmin/${admin.id}`)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(admin.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminList;
