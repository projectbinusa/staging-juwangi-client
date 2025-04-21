import { useContext, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import Swal from "sweetalert2";
import { ThemeContext } from "../../ThemeContext";

const countries = ["India", "United States", "Germany", "Indonesia", "Japan"];

const PersonalInformation = () => {
  const { mode } = useContext(ThemeContext);

  const [gender, setGender] = useState("male");
  const [country, setCountry] = useState("India");

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Saved",
      text: "Your personal information has been updated.",
      confirmButtonColor: "#1976d2",
    });
  };

  const handleReset = () => {
    Swal.fire({
      icon: "warning",
      title: "Reset Form",
      text: "All unsaved changes will be lost.",
      showCancelButton: true,
      confirmButtonText: "Reset",
      confirmButtonColor: "#d32f2f",
    });
  };

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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Personal Information
      </Typography>

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

        {/* Gender */}
        <Grid item xs={12} md={6}>
          <Typography sx={{ mb: 1 }}>Gender</Typography>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Grid>

        {/* Country */}
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={countries}
            value={country}
            onChange={(e, val) => setCountry(val)}
            renderInput={(params) => (
              <TextField {...params} label="Country" />
            )}
          />
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
        <Button variant="outlined" color="error" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
