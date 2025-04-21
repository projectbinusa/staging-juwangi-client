// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = {
  overview: [
    { name: "Jan", netProfit: 70, revenue: 40 },
    { name: "Feb", netProfit: 80, revenue: 50 },
    { name: "Mar", netProfit: 100, revenue: 60 },
    { name: "Apr", netProfit: 85, revenue: 50 },
    { name: "May", netProfit: 90, revenue: 55 },
    { name: "Jun", netProfit: 100, revenue: 50 },
    { name: "Jul", netProfit: 85, revenue: 60 },
  ],
  marketing: [
    { name: "Jan", netProfit: 60, revenue: 35 },
    { name: "Feb", netProfit: 75, revenue: 45 },
    { name: "Mar", netProfit: 85, revenue: 55 },
    { name: "Apr", netProfit: 95, revenue: 65 },
    { name: "May", netProfit: 80, revenue: 50 },
    { name: "Jun", netProfit: 90, revenue: 55 },
    { name: "Jul", netProfit: 70, revenue: 45 },
  ],
  project: [
    { name: "Jan", netProfit: 50, revenue: 30 },
    { name: "Feb", netProfit: 60, revenue: 40 },
    { name: "Mar", netProfit: 70, revenue: 50 },
    { name: "Apr", netProfit: 80, revenue: 60 },
    { name: "May", netProfit: 90, revenue: 70 },
    { name: "Jun", netProfit: 85, revenue: 65 },
    { name: "Jul", netProfit: 75, revenue: 55 },
  ],
  order: [
    { name: "Jan", netProfit: 55, revenue: 25 },
    { name: "Feb", netProfit: 65, revenue: 35 },
    { name: "Mar", netProfit: 95, revenue: 45 },
    { name: "Apr", netProfit: 85, revenue: 60 },
    { name: "May", netProfit: 90, revenue: 70 },
    { name: "Jun", netProfit: 100, revenue: 60 },
    { name: "Jul", netProfit: 95, revenue: 55 },
  ],
};

const stats = [
  { label: "Total Sales", value: "1,800", change: "-245", percentage: "10.6%", color: "red" },
  { label: "Revenue", value: "$5,667", change: "+2,100", percentage: "30.6%", color: "green" },
  { label: "Abandon Cart", value: "128", change: "-26", percentage: "5%", color: "orange" },
  { label: "Ads Spent", value: "$2,500", change: "+200", percentage: "10.6%", color: "green" },
];

const Dashboard = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        p: 3,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Marketing" value="marketing" />
        <Tab label="Project" value="project" />
        <Tab label="Order" value="order" />
      </Tabs>

      <Box sx={{ display: "flex", gap: 4, mt: 3, width: "100%", height: "80%" }}>
        <Box
          sx={{
            flex: 3,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            p: 3,
            boxShadow: 1,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Performance</Typography>
            <Select defaultValue="Monthly" size="small">
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
            </Select>
          </Box>

          <ResponsiveContainer width="100%" height={470}>
            <BarChart data={chartData[selectedTab]}>
              <XAxis dataKey="name" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip />
              <Legend />
              <Bar dataKey="netProfit" fill="#1E88E5" name="Net Profit" />
              <Bar dataKey="revenue" fill="#64B5F6" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {stats.map((stat, index) => (
            <Card key={index} sx={{ p: 3, boxShadow: 2, bgcolor: theme.palette.background.paper }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: stat.color, fontWeight: "bold" }}>
                  {stat.change} ({stat.percentage})
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
