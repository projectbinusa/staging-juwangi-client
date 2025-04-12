// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
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
  Box,
  Avatar,
  MenuItem,
  Select,
} from "@mui/material";
import { Delete, Visibility, Edit } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import { ThemeContext } from "../../ThemeContext";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_DUMMY}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${API_DUMMY}/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchUsers();

          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "#4caf50";
      case "Pending":
        return "#ff9800";
      case "Rejected":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }} marginLeft="250px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <TextField
            placeholder="Search 100 records..."
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box display="flex" gap={2} alignItems="center">
            <Select size="small" value="#" displayEmpty>
              <MenuItem value="#">Sort by (#)</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => navigate("/adduser")}
              sx={{
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              + Add Customer
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {["#", "CUSTOMER NAME", "CONTACT", "AGE", "COUNTRY", "STATUS", "ACTIONS"].map(
                  (header, index) => (
                    <TableCell key={index} align="center" sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) =>
                  user.username?.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: mode === "dark" ? "#333" : "#f9f9f9",
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          alt={user.username}
                          src={`https://i.pravatar.cc/150?img=${index + 1}`}
                        />
                        <Box textAlign="left">
                          <Typography fontWeight="bold">{user.username}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{user.kontak || "N/A"}</TableCell>
                    <TableCell align="center">{user.umur || "N/A"}</TableCell>
                    <TableCell align="center">{user.negara || "N/A"}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          color: "white",
                          backgroundColor: getStatusColor(user.status),
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        {user.status || "Unknown"}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/viewUser/${user.id}`)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => navigate(`/edituser/${user.id}`)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ListUser;
