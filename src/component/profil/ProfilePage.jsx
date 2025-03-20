import { useState, useContext } from "react";
import { Box, Card, Tabs, Tab } from "@mui/material";
import { ThemeContext } from "../../ThemeContext";
import SideProfile from "./SideProfile";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import Setting from "./Setting";
// import Payment from "./Payment";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal"); 
  const { mode } = useContext(ThemeContext); 

  return (
    <Box display="flex" gap={2} sx={{ bgcolor: mode === "dark" ? "#121212" : "#f5f5f5", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideProfile setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Main Content */}
      <Card
        sx={{
          flex: 1,
          p: 3,
          bgcolor: mode === "dark" ? "#1e1e1e" : "white",
          color: mode === "dark" ? "white" : "black",
          borderRadius: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              color: mode === "dark" ? "white" : "black",
            },
            "& .Mui-selected": {
              color: "#1E88E5",
            },
          }}
        >
          <Tab label="Personal Information" value="personal" />
          <Tab label="Settings" value="settings" />
          <Tab label="Change Password" value="change-password" />
          <Tab label="Payment" value="payment" />
        </Tabs>

        {/* Konten berdasarkan tab aktif */}
        <Box mt={2}>
          {activeTab === "personal" && <PersonalInformation />}
          {activeTab === "settings" && <Setting />}
          {activeTab === "change-password" && <ChangePassword />}
          {/* {activeTab === "payment" && <Payment />} */}
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
