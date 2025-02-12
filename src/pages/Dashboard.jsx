// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import Notifications from "../component/Notification";
import SalesChart from "../component/SalesChart";
import SummaryCard from "../component/SummaryCard";

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ringkasan Data Pengguna
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <SummaryCard title="Total Pengguna" value="2.500" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard title="Pengguna Aktif" value="1.200" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard title="Pengguna Baru Bulan Ini" value="150" />
        </Grid>
      </Grid>
      
      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>

      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent>
          <Notifications />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
