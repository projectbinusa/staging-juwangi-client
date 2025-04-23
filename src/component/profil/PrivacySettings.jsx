// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Button,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";

const Privacy = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [blockList, setBlockList] = useState([]);

  const handleSave = () => {
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Your privacy settings have been saved.",
        timer: 2000,
        showConfirmButton: false,
      });
    }, 500);
  };

  const handleAddBlock = (blockedUser) => {
    if (blockedUser && !blockList.includes(blockedUser)) {
      setBlockList([...blockList, blockedUser]);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Privacy Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={showProfile}
            onChange={(e) => setShowProfile(e.target.checked)}
          />
        }
        label="Show my profile publicly"
      />
      <br />
      <FormControlLabel
        control={
          <Switch
            checked={onlineStatus}
            onChange={(e) => setOnlineStatus(e.target.checked)}
          />
        }
        label="Enable online status"
      />
      <br />
      <FormControlLabel
        control={
          <Switch
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
        }
        label="Receive newsletter"
      />
      <br />
      <FormControlLabel
        control={
          <Switch
            checked={twoFactorAuth}
            onChange={(e) => setTwoFactorAuth(e.target.checked)}
          />
        }
        label="Enable Two-Factor Authentication (2FA)"
      />
      <br />
      <Typography variant="subtitle1" gutterBottom>
        Profile Visibility
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={profileVisibility === "friends"}
            onChange={() => setProfileVisibility(profileVisibility === "friends" ? "public" : "friends")}
          />
        }
        label="Visible to Friends Only"
      />
      <br />
      <Typography variant="subtitle1" gutterBottom>
        Block List
      </Typography>
      <TextField
        label="Add user to block list"
        variant="outlined"
        fullWidth
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAddBlock(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <Box mt={1}>
        <Typography variant="body2">
          Blocked Users: {blockList.length > 0 ? blockList.join(", ") : "None"}
        </Typography>
      </Box>

      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Privacy;
