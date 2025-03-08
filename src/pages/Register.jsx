import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, Grid, Button, Typography, Divider, TextField, Stack, IconButton, InputAdornment } from "@mui/material";
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
        width: "99vw",
        height: "50vw",
        margin: 0,
        padding: 0,
        bgcolor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 2,
        color: "#fff",
      }}
    >
      <Box sx={{ width: { xs: "90%", sm: "400px" }, bgcolor: "#1e1e1e", p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center" }}>
              <img src={LogoImage} alt="Logo" style={{ maxWidth: "80px", height: "auto" }} />
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
                  sx={{ borderColor: "#fff", color: "#fff", "&:hover": { borderColor: "#ccc" }, textTransform: "uppercase" }}
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
                  sx={{ borderColor: "#fff", color: "#fff", "&:hover": { borderColor: "#ccc" }, textTransform: "uppercase" }}
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
                  sx={{ borderColor: "#fff", color: "#fff", "&:hover": { borderColor: "#ccc" }, textTransform: "uppercase" }}
                >
                  Sign Up with Google
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: "#fff", color: "#fff" }}>OR</Divider>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h5">Register</Typography>
              <Typography component={Link} to="/login" variant="body2" sx={{ textDecoration: "none", color: "#90caf9" }}>
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
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#90caf9" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#90caf9" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
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
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" sx={{ color: "#fff" }}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#fff" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#fff" },
                    "&:hover fieldset": { borderColor: "#90caf9" },
                    "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                  },
                }}
              />

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: "#1976D2", textTransform: "uppercase" }}>
                Register
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
