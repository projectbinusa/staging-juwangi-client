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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
    <Container maxWidth="lg" sx={{ marginLeft: "100px" }}>
      <h2>Daftar Admin</h2>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate("/addadmin")}
      >
        + Tambah Admin
      </Button>

      <TextField
        label="Cari Admin"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins
              .filter((admin) => admin.username.toLowerCase().includes(search.toLowerCase()))
              .map((admin, index) => (
                <TableRow key={admin.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
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
