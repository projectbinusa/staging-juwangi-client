// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        User Details
      </Typography>

      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : user ? (
        <Card sx={{ maxWidth: 500, mx: "auto", p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">
              <strong>Name:</strong> {user.username || "N/A"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email || "N/A"}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {user.kontak || "N/A"}
            </Typography>
            <Typography>
              <strong>Age:</strong> {user.umur || "N/A"}
            </Typography>
            <Typography>
              <strong>Country:</strong> {user.negara || "N/A"}
            </Typography>
            <Typography>
              <strong>Status:</strong> {user.status || "N/A"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography textAlign="center">User not found.</Typography>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/user")}
        >
          Back to List
        </Button>
      </Box>
    </Container>
  );
};

export default ViewUser;
