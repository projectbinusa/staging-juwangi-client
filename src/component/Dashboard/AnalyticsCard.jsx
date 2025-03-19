// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Select, MenuItem, Button, Box } from "@mui/material";
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { ThemeContext } from "../../ThemeContext";

const sampleData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 60 },
  { name: "May", value: 55 },
];

const scatterDataDescending = [
  { x: 1, y: 80 },
  { x: 2, y: 65 },
  { x: 3, y: 50 },
  { x: 4, y: 35 },
  { x: 5, y: 20 },
];

const AnalyticsCard = ({ title, type, color, percentage }) => {
  const { mode } = useContext(ThemeContext); 

  return (
    <Card
      sx={{
        width: 320,
        padding: 3,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#f8f9fa", 
        color: mode === "dark" ? "#fff" : "#000", 
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Select
            size="small"
            defaultValue="Monthly"
            sx={{
              fontSize: 12,
              backgroundColor: mode === "dark" ? "#333" : "#fff",
              color: mode === "dark" ? "#fff" : "#000",
            }}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </Box>

        {/* Ikon dan Grafik */}
        <Box sx={{ width: "100%", minHeight: 120, mb: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          {type === "bar" ? (
            <ResponsiveContainer width="80%" height={100}>
              <BarChart data={sampleData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill={color} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          ) : type === "line" ? (
            <ResponsiveContainer width="80%" height={100}>
              <LineChart data={sampleData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : type === "scatter" ? (
            <ResponsiveContainer width="80%" height={100}>
              <ScatterChart>
                <XAxis type="number" dataKey="x" hide />
                <YAxis type="number" dataKey="y" hide />
                <Tooltip />
                <Scatter data={scatterDataDescending} fill={color} />
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <InsertChartIcon sx={{ fontSize: 50, color: "#ccc" }} />
          )}
        </Box>

        {/* Statistik */}
        <Typography variant="h6" fontWeight="bold">
          $30,200
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: percentage > 0 ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {percentage > 0 ? <TrendingUpIcon sx={{ mr: 1 }} /> : <TrendingDownIcon sx={{ mr: 1 }} />}
          {percentage}%
        </Box>

        {/* Tombol */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: color,
            color: "white",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#555" : "#ddd",
            },
          }}
        >
          VIEW MORE
        </Button>
      </CardContent>
    </Card>
  );
};

AnalyticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default AnalyticsCard;
