// eslint-disable-next-line no-unused-vars
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, IconButton, Box, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const OrderList = () => {
  const dummyOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      total: "$150.00",
      items: 3,
      status: "Completed",
      date: "18 Mar 2025",
      payment: "Credit Card",
      address: "123 Main St, New York",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      total: "$250.00",
      items: 5,
      status: "Pending",
      date: "17 Mar 2025",
      payment: "PayPal",
      address: "456 Elm St, Los Angeles",
    },
    {
      id: "ORD003",
      customer: "Michael Johnson",
      total: "$300.00",
      items: 2,
      status: "Completed",
      date: "16 Mar 2025",
      payment: "Bank Transfer",
      address: "789 Oak St, Chicago",
    },
    {
      id: "ORD004",
      customer: "Emily Davis",
      total: "$120.00",
      items: 1,
      status: "Cancelled",
      date: "15 Mar 2025",
      payment: "Credit Card",
      address: "101 Pine St, San Francisco",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        Order List
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "12px", boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ }}>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>#</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Order ID</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Customer</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Total Price</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Items</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Date</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Payment</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Address</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: "bold", py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyOrders.map((order, index) => (
              <TableRow key={order.id} sx={{ borderBottom: "1px solid #ddd", height: "80px" }}>
                <TableCell sx={{ fontSize: "16px" }}>{index + 1}</TableCell>
                <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>{order.id}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.customer}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.total}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.items}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.date}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.payment}</TableCell>
                <TableCell sx={{ fontSize: "16px" }}>{order.address}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{ fontSize: "14px", height: "30px", px: 2 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton sx={{ color: "#1976d2", fontSize: "20px" }}>
                    <VisibilityIcon fontSize="large" />
                  </IconButton>
                  <IconButton sx={{ color: "#d32f2f", fontSize: "20px" }}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;
