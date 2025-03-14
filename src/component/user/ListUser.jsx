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
import { API_DUMMY } from "../../utils/api";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`${API_DUMMY}/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Data dari API:", response.data); 

  
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error("Format data API tidak sesuai");
        setUsers([]); 
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); 
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_DUMMY}/api/users/${id}`);
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
              <TableCell>Email</TableCell>
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
                user.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.kontak}</TableCell>
                  <TableCell>{user.umur}</TableCell>
                  <TableCell>{user.negara}</TableCell>
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
