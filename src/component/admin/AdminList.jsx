import { useEffect, useState } from "react";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async () => {
    try {
      const newEntry = { ...newAdmin, id: admins.length + 1 };
      setAdmins([...admins, newEntry]);
      setNewAdmin({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginLeft: "100px" }}>
      <h2>Daftar Admin</h2>
      <TextField label="Cari Admin" variant="outlined" fullWidth margin="normal" value={search} onChange={handleSearch} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.filter((admin) => admin.name.toLowerCase().includes(search.toLowerCase())).map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <h3>Tambah Admin</h3>
      <TextField label="Nama" name="name" value={newAdmin.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Email" name="email" value={newAdmin.email} onChange={handleChange} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={handleAddAdmin}>
        Tambah Admin
      </Button>
    </Container>
  );
};

export default AdminList;
