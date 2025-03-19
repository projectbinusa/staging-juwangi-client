// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Grid } from "@mui/material";
import AnalyticsCard from "../Dashboard/AnalyticsCard";

const Analytics = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginLeft: "150px", marginBottom: "100px", gap: 3, flexWrap: "wrap", mt: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <AnalyticsCard title="New Orders" type="bar" color="#1976D2" percentage={30.6} />
        </Grid>
        <Grid item>
          <AnalyticsCard title="New Users" type="line" color="green" percentage={30.6} />
        </Grid>
        <Grid item>
          <AnalyticsCard title="New Users" type="scatter" color="orange" percentage={-30.6} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
