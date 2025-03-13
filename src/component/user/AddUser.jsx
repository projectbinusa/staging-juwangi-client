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

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    contact: "",
    age: "",
    country: "",
    status: "Pending",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input tidak boleh kosong
    if (!user.name || !user.contact || !user.age || !user.country) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      await axios.post("http://localhost:4322/customers", user);
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
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={handleChange}
        />
        <TextField
          label="Contact"
          name="contact"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.contact}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.age}
          onChange={handleChange}
        />
        <TextField
          label="Country"
          name="country"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.country}
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
