// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams(); // Mengambil parameter ID dari URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4322/customers/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Gagal mengambil data user.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{marginLeft: "100px"}}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        User Details
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {user ? (
        <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography>Contact: {user.contact}</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Country: {user.country}</Typography>
            <Typography>Status: {user.status}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}

      <Button variant="outlined" color="primary" onClick={() => navigate("/listuser")}>
        Back to List
      </Button>
    </Container>
  );
};

export default ViewUser;
