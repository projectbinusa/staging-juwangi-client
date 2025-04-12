import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { ThemeContext } from "../../ThemeContext";

const API_URL = "http://localhost:4322/api/users";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext); 
  const [user, setUser] = useState({
    email: "",
    username: "",
    kontak: "",
    umur: "",
    negara: "",
    password: "",
    status: "",
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.error("Gagal ambil data user:", error);
      Swal.fire("Error", "Gagal ambil data user!", "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, user);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "User berhasil diperbarui!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/user");
      });
    } catch (error) {
      console.error("Gagal update user:", error);
      Swal.fire("Gagal", "Gagal update user!", "error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, marginLeft: 40 }}>
      <Card elevation={5}>
        <CardContent>
          <Box 
            sx={{
              border: "1px solid #ddd",
              padding: 4,
              borderRadius: 2,
              backgroundColor: mode === "dark" ? "#121212" : "#fafafa",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              color={mode === "dark" ? "white" : "black"} 
              gutterBottom
              textAlign="center"
            >
                Edit Data Customer
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Kontak"
                    name="kontak"
                    value={user.kontak || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Umur"
                    name="umur"
                    value={user.umur || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    type="number"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Negara"
                    name="negara"
                    value={user.negara || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    value={user.password || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    type="password"
                    placeholder="Kosongkan jika tidak diubah"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Status"
                    name="status"
                    value={user.status || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "white" : "black",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" pt={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate("/user")}
                      sx={{ px: 6, py: 2 }}
                    >
                      Kembali
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ px: 6, py: 2 }}
                    >
                      Simpan Perubahan
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditUser;
