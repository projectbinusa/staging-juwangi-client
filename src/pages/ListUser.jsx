// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Button, IconButton, Typography, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import Sidebar from "../component/sidebar/Sidebar";

const customers = [
  { id: 1, name: "Joe Schilder", email: "sip@gmail.com", contact: "+1 (731) 342-9783", age: 39, country: "Canada", status: "Rejected" },
  { id: 2, name: "Phoebe Venturi", email: "ke@gmail.com", contact: "+1 (887) 744-6950", age: 52, country: "Thailand", status: "Verified" },
  { id: 3, name: "Caroline Pandolfi", email: "secjavkib@gmail.com", contact: "+1 (618) 787-3453", age: 45, country: "Barbados", status: "Verified" },
  { id: 4, name: "Ricardo Marchetti", email: "ho@gmail.com", contact: "+1 (415) 628-7505", age: 29, country: "Italy", status: "Verified" },
  { id: 5, name: "Dorothy Hussain", email: "socuin@gmail.com", contact: "+1 (856) 459-8945", age: 58, country: "Mauritius", status: "Pending" },
];

const statusColors = {
  Verified: "green",
  Rejected: "red",
  Pending: "orange",
};

const CustomerTable = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Customers</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 1 }}>{customer.name[0]}</Avatar>
                    <Box>
                      <Typography>{customer.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{customer.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.age}</TableCell>
                <TableCell>{customer.country}</TableCell>
                <TableCell>
                  <Typography color={statusColors[customer.status]}>{customer.status}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="primary"><Visibility /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>+ Add Customer</Button>
    </Box>
  );
};

export default CustomerTable;
