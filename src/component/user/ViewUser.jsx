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
import { API_DUMMY } from "../../utils/api";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setLoading(true); 
    setError(""); 

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_DUMMY}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      console.log("Response dari API:", response); 
      console.log("Data user:", response.data.data);

      if (response.data && typeof response.data.data === "object") {
        setUser(response.data.data);
      } else {
        setError("Data user tidak valid.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Gagal mengambil data user.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginLeft: "100px" }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        User Details
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {loading ? (
        <Typography>Loading...</Typography>
      ) : user ? (
        <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Name: {user?.username }</Typography>
            <Typography>Contact: {user?.kontak }</Typography>
            <Typography>Age: {user?.umur }</Typography>
            <Typography>Country: {user?.negara }</Typography>
            <Typography>Status: {user?.status }</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>User not found.</Typography>
      )}

      <Button variant="outlined" color="primary" onClick={() => navigate("/user")}>
        Back to List
      </Button>
    </Container>
  );
};

export default ViewUser;
