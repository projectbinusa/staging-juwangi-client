// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import CachedIcon from "@mui/icons-material/Cached";
import PropTypes from "prop-types";
import Grafik from "./Grafik"; // Import Komponen Grafik

// Dummy Data
const sampleData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 60 },
  { name: "May", value: 55 },
];

const scatterData = [
  { x: 1, y: 80 },
  { x: 2, y: 65 },
  { x: 3, y: 50 },
  { x: 4, y: 35 },
  { x: 5, y: 20 },
];

// **Komponen Kartu Analytics**
const AnalyticsCard = ({ title, type, color, percentage }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Select
            defaultValue="monthly"
            size="small"
            sx={{
              fontSize: "0.8rem",
              backgroundColor: theme.palette.mode === "dark" ? "#4b5563" : "#f3f4f6",
              color: theme.palette.text.primary,
              borderRadius: 2,
              "& .MuiSelect-select": { p: "5px 8px" },
            }}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: "100%", height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ResponsiveContainer width="90%" height="100%">
            {type === "bar" && (
              <BarChart data={sampleData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill={color} barSize={12} />
              </BarChart>
            )}
            {type === "line" && (
              <LineChart data={sampleData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
              </LineChart>
            )}
            {type === "scatter" && (
              <ScatterChart>
                <XAxis type="number" dataKey="x" hide />
                <YAxis type="number" dataKey="y" hide />
                <Tooltip />
                <Scatter data={scatterData} fill={color} />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </Box>

        <Typography variant="h5" fontWeight="bold">$30,200</Typography>
        <Typography color={percentage > 0 ? "green" : "red"} fontWeight="bold">
          {percentage > 0 ? `↑ ${percentage}%` : `↓ ${percentage}%`}
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 2,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
          }}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
};

// **Komponen Kartu Penyimpanan Dropbox**
const StorageCard = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        background: theme.palette.mode === "dark" ? "#1e293b" : "linear-gradient(to right, #1e293b, #29384e)",
        color: "#fff",
        p: 2,
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <CloudOutlinedIcon sx={{ color: "#ffffff99" }} aria-label="Storage Icon" />
      </Box>
      <Typography variant="subtitle1">Dropbox Storage</Typography>
      <Typography variant="h6">150GB</Typography>
      <Typography variant="body2">1,342GB of 150GB Used</Typography>
      <Box sx={{ height: 6, bgcolor: "#334155", borderRadius: 5, mt: 1, overflow: "hidden" }}>
        <Box sx={{ width: "90%", height: "100%", bgcolor: "#eab308" }} />
      </Box>
    </Card>
  );
};

// **Komponen Kartu Balance**
const BalanceCard = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: theme.palette.mode === "dark" ? "#1e40af" : "#3b82f6",
        color: "#fff",
        textAlign: "center",
        p: 2,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="subtitle1">Available Balance</Typography>
        <Typography variant="h5" fontWeight="bold">
          $1,234.90
        </Typography>
      </Box>
      <IconButton sx={{ color: "white" }} aria-label="Refresh Balance">
        <CachedIcon />
      </IconButton>
    </Card>
  );
};

// **🔥 Komponen Utama Dashboard**
const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ marginLeft: 20, p: 3, bgcolor: theme.palette.background.default, borderRadius: 2 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard title="New Orders" type="bar" color="#3b82f6" percentage={30.6} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard title="New Users" type="line" color="#22c55e" percentage={30.6} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard title="New Users" type="scatter" color="#f97316" percentage={-30.6} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 2 }}>
            <StorageCard />
            <BalanceCard />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grafik />
        </Grid>
      </Grid>
    </Box>
  );
};

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bar", "line", "scatter"]).isRequired,
  color: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};


export default Dashboard;
