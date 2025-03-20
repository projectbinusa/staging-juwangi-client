import { useState } from "react";
import { Box, Card, Typography, TextField, IconButton, InputAdornment, Button, List, ListItem, ListItemText, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

  const handleTogglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Old Password"
            type={showPassword.old ? "text" : "password"}
            placeholder="Enter Old Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleTogglePassword("old")}>{showPassword.old ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword.new ? "text" : "password"}
            placeholder="Enter New Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleTogglePassword("new")}>{showPassword.new ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="Enter Confirm Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleTogglePassword("confirm")}>{showPassword.confirm ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>New password must contain:</Typography>
        <List>
          <ListItem><ListItemText primary="- At least 8 characters" /></ListItem>
          <ListItem><ListItemText primary="- At least 1 lowercase letter (a-z)" /></ListItem>
          <ListItem><ListItemText primary="- At least 1 uppercase letter (A-Z)" /></ListItem>
          <ListItem><ListItemText primary="- At least 1 number (0-9)" /></ListItem>
          <ListItem><ListItemText primary="- At least 1 special character" /></ListItem>
        </List>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary">Save</Button>
      </Box>
    </Card>
  );
};

export default ChangePassword;
