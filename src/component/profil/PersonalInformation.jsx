import { useContext } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { ThemeContext } from "../../ThemeContext";

const PersonalInformation = () => {
  const { mode } = useContext(ThemeContext); 

  return (
    <Box
      sx={{
        p: 3,
        boxShadow: 3,
        borderRadius: 3,
        backgroundColor: mode === "dark" ? "#1e1e1e" : "white",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            defaultValue="Stebin"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            defaultValue="Ben"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            defaultValue="stebin.ben@gmail.com"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Date of Birth"
            defaultValue="March 10, 1993"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Phone Number"
            defaultValue="+91 9652364852"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Designation"
            defaultValue="Full Stack Developer"
            InputLabelProps={{ style: { color: mode === "dark" ? "#bbb" : "black" } }}
            sx={{
              input: { color: mode === "dark" ? "white" : "black" },
              bgcolor: mode === "dark" ? "#2a2a2a" : "white",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInformation;
