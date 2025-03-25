import { useState } from "react";
import { Box, Card, Typography, List, ListItem, Switch, FormControlLabel, Button } from "@mui/material";

const Settings = () => {
  const [settings, setSettings] = useState({
    orderConfirmation: true,
    emailNotification: false,
    systemNotification: true,
    languageChange: true,
  });

  const handleToggleSetting = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  return (
    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Settings</Typography>
      <List>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={settings.orderConfirmation} onChange={() => handleToggleSetting("orderConfirmation")} />}
            label="Order Confirmation"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={settings.emailNotification} onChange={() => handleToggleSetting("emailNotification")} />}
            label="Setup Email Notification"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={settings.systemNotification} onChange={() => handleToggleSetting("systemNotification")} />}
            label="Update System Notification"
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Switch checked={settings.languageChange} onChange={() => handleToggleSetting("languageChange")} />}
            label="Language Change"
          />
        </ListItem>
      </List>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: "#d32f2f", color: "#fff", "&:hover": { backgroundColor: "#b71c1c" } }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">Save</Button>
      </Box>
    </Card>
  );
};

export default Settings;
