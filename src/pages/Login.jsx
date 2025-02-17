// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Grid, Button, Typography, Divider, TextField, Stack, IconButton, InputAdornment 
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import LogoImage from '../assets/logo.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialLogin = (platform) => {
    console.log(`Login dengan ${platform}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit login form');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#121212',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' }, // Lebar responsif
          bgcolor: '#1e1e1e',
          p: 3,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={LogoImage}
                alt="Logo"
                style={{
                  maxWidth: '80px',
                  height: 'auto'
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
                  onClick={() => handleSocialLogin('Facebook')}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': { borderColor: '#ccc' }
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
                  onClick={() => handleSocialLogin('Twitter')}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': { borderColor: '#ccc' }
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
                  onClick={() => handleSocialLogin('Google')}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': { borderColor: '#ccc' }
                  }}
                >
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: '#fff', color: '#fff' }}>OR</Divider>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography variant="h5">Login</Typography>
              <Typography
                component={Link}
                to="/"
                variant="body2"
                sx={{ textDecoration: 'none', color: '#90caf9' }}
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
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#fff' },
                    '&:hover fieldset': { borderColor: '#90caf9' },
                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                variant="outlined"
                // Ganti type jadi kondisi showPassword
                type={showPassword ? 'text' : 'password'}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: '#fff' }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#fff' },
                    '&:hover fieldset': { borderColor: '#90caf9' },
                    '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: '#90caf9' }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
