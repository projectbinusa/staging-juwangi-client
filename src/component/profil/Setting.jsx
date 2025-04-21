import { useContext, useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";
import { ThemeContext } from "../../ThemeContext"; 

const Settings = () => {
  const { mode, toggleTheme } = useContext(ThemeContext); 
  const [settings, setSettings] = useState({
    orderConfirmation: true,
    emailNotification: false,
    systemNotification: true,
    languageChange: true,
    autoUpdate: true,
    twoFactorAuth: false,
    privacyMode: false,
  });

  const handleToggleSetting = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleSave = () => {
    Swal.fire({
      icon: "success",
      title: "Settings Saved",
      text: "Your preferences have been successfully updated!",
      confirmButtonColor: "#1976d2",
    });
  };

  const handleResetDefault = () => {
    Swal.fire({
      title: "Reset to Default?",
      text: "All settings will return to their default values.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Reset",
    }).then((result) => {
      if (result.isConfirmed) {
        setSettings({
          orderConfirmation: true,
          emailNotification: false,
          systemNotification: true,
          languageChange: true,
          autoUpdate: true,
          twoFactorAuth: false,
          privacyMode: false,
        });
        toggleTheme(); 
        Swal.fire("Reset!", "Settings have been reset.", "success");
      }
    });
  };

  return (
    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <List>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.orderConfirmation}
                onChange={() => handleToggleSetting("orderConfirmation")}
              />
            }
            label="Order Confirmation"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.emailNotification}
                onChange={() => handleToggleSetting("emailNotification")}
              />
            }
            label="Setup Email Notification"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.systemNotification}
                onChange={() => handleToggleSetting("systemNotification")}
              />
            }
            label="Update System Notification"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.languageChange}
                onChange={() => handleToggleSetting("languageChange")}
              />
            }
            label="Language Change"
          />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        {/* DARK MODE => connect to context */}
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme} 
              />
            }
            label="Dark Mode"
          />
        </ListItem>

        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.autoUpdate}
                onChange={() => handleToggleSetting("autoUpdate")}
              />
            }
            label="Auto Update"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.twoFactorAuth}
                onChange={() => handleToggleSetting("twoFactorAuth")}
              />
            }
            label="Two-Factor Authentication"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={settings.privacyMode}
                onChange={() => handleToggleSetting("privacyMode")}
              />
            }
            label="Privacy Mode"
          />
        </ListItem>
      </List>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" color="error" onClick={handleResetDefault}>
          Reset to Default
        </Button>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              mr: 1,
              "&:hover": { backgroundColor: "#b71c1c" },
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default Settings;
