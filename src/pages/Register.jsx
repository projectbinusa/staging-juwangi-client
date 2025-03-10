import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Container, Box, Grid, Button, Typography, Divider, TextField, Stack, IconButton, InputAdornment 
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/api";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LogoImage from "../assets/logo.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSocialLogin = (platform) => {
    console.log(`Register with ${platform}`);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_DUMMY}/api/users/register`, {
        email,
        password,
        username,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil Register!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "300px",
        bgcolor: "#fff",
        minHeight: "100vh",
        py: 5, 
      }}
    >
      <Box 
        sx={{ 
          width: "100%",
          maxWidth: { xs: "90%", sm: "400px" }, 
          bgcolor: "#f5f5f5",
          px: 3, 
          py: 4, 
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <img src={LogoImage} alt="Logo" style={{ maxWidth: "70px", height: "auto" }} />
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
                    "&:hover": { borderColor: "#555" }, 
                    textTransform: "uppercase",
                    fontSize: { xs: "12px", sm: "14px" }, 
                  }}
                >
                  Sign Up with Facebook
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
                    "&:hover": { borderColor: "#555" }, 
                    textTransform: "uppercase",
                    fontSize: { xs: "12px", sm: "14px" }, 
                  }}
                >
                  Sign Up with Twitter
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
                    "&:hover": { borderColor: "#555" }, 
                    textTransform: "uppercase",
                    fontSize: { xs: "12px", sm: "14px" }, 
                  }}
                >
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: "#000", color: "#000" }}>OR</Divider>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h6">Register</Typography>
              <Typography 
                component={Link} 
                to="/login" 
                variant="body2" 
                sx={{ textDecoration: "none", color: "#1976D2", fontSize: { xs: "12px", sm: "14px" } }}
              >
                Already have an account?
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box component="form" onSubmit={register}>
              <TextField
                fullWidth
                label="Name"
                name="username"
                margin="normal"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mt: 2, 
                  bgcolor: "#1976D2", 
                  textTransform: "uppercase",
                  fontSize: { xs: "14px", sm: "16px" }, 
                }}
              >
                Register
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
