// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage
        const response = await axios.get("http://localhost:4322/customers", {
            headers: {
                Authorization: `Bearer ${token}` // Tambahkan token ke header
            }
        });
        setUsers(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


  // Handle Delete User
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:4322/customers/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginLeft: "100px"}}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        List User
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate("/adduser")}
      >
        + Add User
      </Button>

      <TextField
        label="Search users"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.country}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/viewuser/${user.id}`)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => navigate(`/edituser/${user.id}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
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

export default ListUser;
