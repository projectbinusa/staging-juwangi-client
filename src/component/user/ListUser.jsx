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
  useTheme,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../utils/api";
import { ThemeContext } from "../../ThemeContext";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const theme = useTheme(); 
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

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginLeft="50px"
        textAlign="center"
        sx={{ mt: 4, color: theme.palette.text.primary }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
          List User
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          onClick={() => navigate("/adduser")}
        >
          + Add User
        </Button>

        <TextField
          label="Search users..."
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: 500,
            marginBottom: 2,
            borderRadius: "8px",
            "& input": {
              textAlign: "center",
              color: theme.palette.text.primary,
            },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            overflowX: "auto",
            maxWidth: 900,
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                {["#", "Name", "Email", "Contact", "Age", "Country", "Status", "Actions"].map(
                  (header, index) => (
                    <TableCell key={index} align="center" sx={{ color: "white", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) =>
                  user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor: mode === "dark" ? "#424242" : "white",
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: mode === "dark" ? "#616161" : "#f5f5f5",
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.kontak || <Typography color="gray">N/A</Typography>}
                    </TableCell>
                    <TableCell align="center">
                      {user.umur ? user.umur : <Typography color="gray">N/A</Typography>}
                    </TableCell>
                    <TableCell align="center">
                      {user.negara ? user.negara : <Typography color="gray">N/A</Typography>}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          backgroundColor:
                            user.status === "Active" ? "#4caf50" : "#9e9e9e",
                          color: "white",
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
                        onClick={() => navigate(`/viewuser/${user.id}`)}
                        sx={{ "&:hover": { color: theme.palette.primary.dark } }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                        sx={{ "&:hover": { color: theme.palette.error.dark } }}
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
