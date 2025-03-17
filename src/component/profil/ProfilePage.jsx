import React from "react";
import { Container, Typography, Tabs, Tab, Box, Avatar, Grid, TextField, Button } from "@mui/material";
import { AccountCircle, Lock, Settings, Person, People } from "@mui/icons-material";

function AccountProfile() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ marginLeft: "100px"}}>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Basic Account
        </Typography>
        <Tabs value={tabValue} onChange={handleChange} aria-label="account profile tabs">
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<People />} label="Personal" />
          <Tab icon={<AccountCircle />} label="My Account" />
          <Tab icon={<Lock />} label="Change Password" />
          <Tab icon={<Settings />} label="Role" />
          <Tab icon={<Settings />} label="Settings" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src="https://tse4.mm.bing.net/th?id=OIP.dErkv765aE3IKCmV9q5dPQHaHa&pid=Api&P=0&h=180" 
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6">Anshan H.</Typography>
            <Typography variant="body2" color="textSecondary">
              Project Manager
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1">
              Hello, I&apos;m Anshan Handgun, Creative Graphic Designer &amp; User Experience Developer.
            </Typography>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6">Personal Information</Typography>
          <TextField fullWidth label="Full Name" margin="normal" />
          <TextField fullWidth label="Phone Number" margin="normal" />
          <Button variant="contained" color="primary">Save</Button>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h6">Account Details</Typography>
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Username" margin="normal" />
          <Button variant="contained" color="primary">Update Account</Button>
        </Box>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h6">Change Password</Typography>
          <TextField fullWidth label="Current Password" type="password" margin="normal" />
          <TextField fullWidth label="New Password" type="password" margin="normal" />
          <TextField fullWidth label="Confirm New Password" type="password" margin="normal" />
          <Button variant="contained" color="primary">Change Password</Button>
        </Box>
      )}

      {tabValue === 4 && (
        <Box>
          <Typography variant="h6">Role Management</Typography>
          <TextField fullWidth label="User Role" margin="normal" />
          <Button variant="contained" color="primary">Update Role</Button>
        </Box>
      )}

      {tabValue === 5 && (
        <Box>
          <Typography variant="h6">Settings</Typography>
          <TextField fullWidth label="Notification Preferences" margin="normal" />
          <Button variant="contained" color="primary">Save Settings</Button>
        </Box>
      )}
    </Container>
  );
}

export default AccountProfile;
