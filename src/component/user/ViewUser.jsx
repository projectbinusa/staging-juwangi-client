// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../utils/api";
     import { ThemeContext } from "../../ThemeContext";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { mode } = useContext(ThemeContext);

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
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box
        display="flex"
        justifyContent="center"
        marginLeft="380px"
        sx={{
          backgroundColor: mode === "dark" ? "#121212" : "#fff",
          color: mode === "dark" ? "#fff" : "#000",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            color={mode === "dark" ? "primary.light" : "primary.main"}
          >
            Detail Pengguna
          </Typography>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : user ? (
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                backgroundColor: mode === "dark" ? "#333" : "#f9f9f9",
                color: mode === "dark" ? "#fff" : "#000",
              }}
            >
              <CardContent>
                <Stack direction="column" alignItems="center" spacing={2}>
                  <Avatar
                    alt={user.username}
                    src={`https://i.pravatar.cc/150?img=${parseInt(id) % 70 || 1}`}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID Pengguna: {id}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3, borderColor: mode === "dark" ? "#fff" : "#000" }} />

                <Box px={2}>
                  <Typography mb={1}>
                    <strong>Email:</strong> {user.email || "N/A"}
                  </Typography>
                  <Typography mb={1}>
                    <strong>Kontak:</strong> {user.kontak || "N/A"}
                  </Typography>
                  <Typography mb={1}>
                    <strong>Umur:</strong> {user.umur || "N/A"}
                  </Typography>
                  <Typography mb={1}>
                    <strong>Negara:</strong> {user.negara || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {user.status || "N/A"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography textAlign="center">User tidak ditemukan.</Typography>
          )}

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/user")}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: mode === "dark" ? "#1976d2" : "#3f51b5",
                color: "#fff",
              }}
            >
              Kembali ke Daftar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ViewUser;
