import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import LineChart from "./LineChart";
import PropTypes from "prop-types";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 350 },
  { name: "Jun", value: 450 },
];

const ChartPage = ({ isSidebarOpen }) => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === "dark";

  const colors = {
    light: ["#4285F4", "#FBBC05", "#34A853", "#EA4335"],
    dark: ["#7BAAF7", "#FFD54F", "#66BB6A", "#EF5350"],
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: 3,
        transition: "margin-left 0.3s ease-in-out",
        marginLeft: isSidebarOpen ? "240px" : "60px",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Chart
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {["All Earnings", "Page Views", "Total Task", "Download"].map((title, index) => (
          <Card
            key={index}
            sx={{
              flex: "1 1 250px",
              backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
              color: isDarkMode ? "#fff" : "#000",
              transition: "width 0.3s ease-in-out",
            }}
          >
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={data}>
                  <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  />
                  <Bar dataKey="value" fill={colors[isDarkMode ? "dark" : "light"][index]} />
                </BarChart>
              </ResponsiveContainer>
              <Typography variant="h5" fontWeight="bold">
                {index === 0 ? "$3200" : index === 1 ? "290+" : index === 2 ? "1468" : "$300"}
              </Typography>
              <Typography color={index === 3 ? "error.main" : "success.main"}>↑ 30.6%</Typography>
            </CardContent>
          </Card>
        ))}
          <Box item xs={10}>
          <LineChart />
        </Box>
      </Box>
    </Box>
  );
};

ChartPage.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired, 
};

export default ChartPage;
