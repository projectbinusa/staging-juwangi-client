// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Divider,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LogoImage from "../assets/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSocialLogin = (platform) => {
    console.log(`Login dengan ${platform}`);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_DUMMY}/api/users/login`, {
        email: email,
        password: password,
      });
  
      console.log("Response Data:", response.data); // Tambahkan ini
  
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message); // Tambahkan ini
      
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: error.response?.data?.message || "Periksa kembali email dan password Anda.",
      });
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#fff", // Mode terang (putih)
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000", // Teks hitam
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "400px" },
          bgcolor: "#f5f5f5", // Background form abu muda
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={LogoImage}
                alt="Logo"
                style={{
                  maxWidth: "80px",
                  height: "auto",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={() => handleSocialLogin("Facebook")}
                  sx={{
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": { borderColor: "#1976D2" },
                  }}
                >
                  Sign In with Facebook
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<TwitterIcon />}
                  onClick={() => handleSocialLogin("Twitter")}
                  sx={{
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": { borderColor: "#1976D2" },
                  }}
                >
                  Sign In with Twitter
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={() => handleSocialLogin("Google")}
                  sx={{
                    borderColor: "#000",
                    color: "#000",
                    "&:hover": { borderColor: "#1976D2" },
                  }}
                >
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: "#000", color: "#000" }}>OR</Divider>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h5">Login</Typography>
              <Typography
                component={Link}
                to="/register"
                variant="body2"
                sx={{ textDecoration: "none", color: "#1976D2" }}
              >
                Don&apos;t have an account?
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "#333" } }} // Label abu gelap
                sx={{
                  input: { color: "#000" }, // Teks hitam
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#333" }, // Border abu gelap
                    "&:hover fieldset": { borderColor: "#1976D2" }, // Hover biru standar
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" }, // Fokus biru standar
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "#333" } }} // Label abu gelap
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: "#000" }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#000" }, // Teks hitam
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#333" }, // Border abu gelap
                    "&:hover fieldset": { borderColor: "#1976D2" }, // Hover biru standar
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" }, // Fokus biru standar
                  },
                }}
              />

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#1976D2" }}>
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
