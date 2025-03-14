// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.kontak || !user.umur || !user.negara ) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      await axios.post(`${API_DUMMY}/api/users/register`, user);
      navigate("/user"); 
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Gagal menambahkan user!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{marginLeft: "100px"}}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Add New User
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.password}
          onChange={handleChange}
        />
        <TextField
          label="kontak"
          name="kontak"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.kontak}
          onChange={handleChange}
        />
        <TextField
          label="umur"
          name="umur"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.umur}
          onChange={handleChange}
        />
        <TextField
          label="negara"
          name="negara"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.negara}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={user.status} onChange={handleChange}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Verified">Verified</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Save User
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/user")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddUser;
