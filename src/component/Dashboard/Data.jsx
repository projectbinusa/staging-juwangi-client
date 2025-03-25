// eslint-disable-next-line no-unused-vars
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Card, CardContent, Typography, Chip, Button, Avatar, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const teamMembers = [
  { name: "Pak Roihan Abdullah", role: "Project Creator", avatar: "https://tse2.mm.bing.net/th?id=OIP.Zvs5IHgOO5kip7A32UwZJgHaHa&pid=Api&P=0&h=180" },
  { name: "Daris Tsaqibudin Tsanny", role: "Working on BackEnd", avatar: "https://tse1.mm.bing.net/th?id=OIP.jl1tShPuV31d0r83YqyrhQHaHa&pid=Api&P=0&h=180" },
  { name: "Andika Risky Ferdianto", role: "Working on FrontEnd", avatar: "https://tse4.mm.bing.net/th?id=OIP.wEsBe2udHBieFeZVmus8qAHaHk&pid=Api&P=0&h=180" },
  { name: "Nabil Ulhaq Satria", role: "Working on FrontEnd", avatar: "https://tse3.mm.bing.net/th?id=OIP.ywHdSgiEyb--OBN2gD2w1QHaHa&pid=Api&P=0&h=180" },
];

const DataPage = () => {
  const theme = useTheme(); 

  return (
    <Container maxWidth="xl" sx={{ padding: 3, backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">My Task</Typography>
              {[1, 2, 3].map((task, index) => (
                <Card key={index} sx={{ backgroundColor: theme.palette.action.hover, marginTop: 2, padding: 2 }}>
                  <Typography fontWeight="bold">Follow up client for feedback</Typography>
                  <Typography variant="body2" color="text.secondary">Sending report</Typography>
                  <Chip label="00:15" color={index % 2 === 0 ? "error" : "success"} sx={{ marginTop: 1 }} />
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar>G</Avatar>
                </Grid>
                <Grid item>
                  <Typography fontWeight="bold">Google LLC</Typography>
                  <Typography variant="body2">Sr. UI Designer</Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Lorem Ipsum is simply dummy text of the printing industry.
              </Typography>
              <Grid container spacing={1} mt={2}>
                <Chip label="Fulltime" />
                <Chip label="Remote" />
                <Chip label="Hourly" />
              </Grid>
              <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Apply
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Team Members</Typography>
              {teamMembers.map((member, index) => (
                <Card key={index} sx={{ backgroundColor: theme.palette.action.hover, marginTop: 2, padding: 2, display: "flex", alignItems: "center" }}>
                  <Avatar src={member.avatar} sx={{ marginRight: 2 }} />
                  <div>
                    <Typography fontWeight="bold">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Products</Typography>
                <TextField
                  placeholder="Search 10 records..."
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: theme.palette.action.hover, borderRadius: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {["Iphone 15 pro max", "Xiaomi 15 Ultra", "Vivo X200 Pro", "Oppo Find X8 pro"].map((name, index) => (
                <Card key={index} sx={{ backgroundColor: theme.palette.action.hover, marginTop: 2, padding: 2, display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight="bold">{name}</Typography>
                  <Chip label={index === 3 ? "Active" : "Pending"} color={index === 3 ? "success" : "warning"} />
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">Monthly Revenue</Typography>
              <Typography variant="h5" color="success.main">$746.5k +20.6%</Typography>
              {["Leila Schwartz", "Adrian Bishop", "Mason Lee", "Maurice Parker", "Helen Bass"].map((customer, index) => (
                <Card key={index} sx={{ backgroundColor: theme.palette.action.hover, marginTop: 2, padding: 2, display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight="bold">{customer}</Typography>
                  <Chip label={index === 2 ? "Team" : "Premium"} color={index === 2 ? "error" : "primary"} />
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Container>
  );
};

export default DataPage;
