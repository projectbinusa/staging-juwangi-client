// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ThemeContext } from "../../ThemeContext";

const data = [
  { name: "Jun", value: 90 },
  { name: "Jul", value: 50 },
  { name: "Aug", value: 55 }
];

const barData = [
  { name: "Week 1", value: 10 },
  { name: "Week 2", value: 20 },
  { name: "Week 3", value: 30 },
  { name: "Week 4", value: 25 }
];

const ChartPage = () => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === "dark";
  const bgColor = isDarkMode ? "#1E1E1E" : "#f5f5f5";
  const textColor = isDarkMode ? "#fff" : "#000";
  const axisColor = isDarkMode ? "#bbb" : "#333";
  const tooltipBg = isDarkMode ? "#333" : "#fff";
  const tooltipColor = isDarkMode ? "#fff" : "#000";

  return (
    <Grid container spacing={2} sx={{ backgroundColor: isDarkMode ? "#121212" : "#ffffff", color: textColor, p: 2 }}>
      {/* Repeat Customer Rate */}
      <Grid item xs={12} md={8}>
        <Card sx={{ backgroundColor: bgColor }}>
          <CardContent>
            <Typography variant="h6" color={textColor}>Repeat customer rate</Typography>
            <ResponsiveContainer width="100%" height={290}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                <XAxis dataKey="name" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipColor }} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      
      {/* New Orders & New Users */}
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: bgColor, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" color={textColor}>New Orders</Typography>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                <XAxis dataKey="name" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipColor }} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card sx={{ backgroundColor: bgColor }}>
          <CardContent>
            <Typography variant="h6" color={textColor}>New Users</Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
                <XAxis dataKey="name" stroke={axisColor} />
                <YAxis stroke={axisColor} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, color: tooltipColor }} />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Project Overview */}
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: bgColor, display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Typography variant="h6" color={textColor}>Project Overview</Typography>
          <Button variant="contained" color="primary">+ Add Project</Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartPage;