// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Grid } from '@mui/material';
import AnalyticsCard from './AnalyticsCard';

const data = [
    { name: 'Jan', NetProfit: 80, Revenue: 40 },
    { name: 'Feb', NetProfit: 85, Revenue: 45 },
    { name: 'Mar', NetProfit: 100, Revenue: 50 },
    { name: 'Apr', NetProfit: 95, Revenue: 45 },
    { name: 'May', NetProfit: 80, Revenue: 50 },
    { name: 'Jun', NetProfit: 100, Revenue: 50 },
    { name: 'Jul', NetProfit: 80, Revenue: 55 },
];

const analyticsData = [
    { title: 'Total Sales', type: 'bar', color: '#3b82f6', percentage: -10.6 },
    { title: 'Revenue', type: 'line', color: '#22c55e', percentage: 30.6 },
    { title: 'Abandon Cart', type: 'scatter', color: '#f97316', percentage: -5 },
    { title: 'Ads Spent', type: 'bar', color: '#eab308', percentage: 10.6 },
];

const DashboardChart = () => {
    return (
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            {/* Bagian Atas: Analytics Cards */}
            <Grid container spacing={2}>
                {analyticsData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <AnalyticsCard title={item.title} type={item.type} color={item.color} percentage={item.percentage} />
                    </Grid>
                ))}
            </Grid>

            {/* Bagian Bawah: Grafik Utama */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="NetProfit" fill="#3b82f6" />
                        <Bar dataKey="Revenue" fill="#93c5fd" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DashboardChart;
