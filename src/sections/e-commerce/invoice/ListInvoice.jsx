import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Typography, TextField, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { API_DUMMY } from "../../../utils/api";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [users, setUsers] = useState({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("user");

  useEffect(() => {
    axios.get(`${API_DUMMY}/api/invoices`)
      .then(response => {
        setInvoices(response.data);


        response.data.forEach(invoice => {
          axios.get(`${API_DUMMY}/api/users`)
            .then(userRes => {
              setUsers(prevUsers => ({
                ...prevUsers,
                [invoice.userId]: userRes.data
              }));
            })
            .catch(error => console.error("Error fetching user:", error));
        });
      })
      .catch(error => console.error("Error fetching invoices:", error));
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    users[invoice.userId]?.nama?.toLowerCase().includes(search.toLowerCase()) ||
    users[invoice.userId]?.email?.toLowerCase().includes(search.toLowerCase()) ||
    String(invoice.invoiceId).includes(search)
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid": return "success";
      case "unpaid": return "primary";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const columns = [
    { field: "invoiceId", headerName: "INVOICE ID", width: 120 },
    { 
      field: "user", 
      headerName: "USER INFO", 
      width: 200, 
      renderCell: (params) => {
        const user = users[params.row.nama];
        return user ? (
          <Box>
            <Typography fontWeight="bold">{user.nama}</Typography>
            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
          </Box>
        ) : <Typography color="textSecondary">Loading...</Typography>;
      }
    },
    { 
      field: "date", 
      headerName: "CREATE DATE", 
      width: 150,
      valueGetter: (params) => 
        params.row?.date ? new Date(params.row.date).toLocaleDateString() : "N/A"
    },
    { 
      field: "duoDate", 
      headerName: "DUE DATE", 
      width: 150,
      valueGetter: (params) => 
        params.row?.duoDate ? new Date(params.row.duoDate).toLocaleDateString() : "N/A"
    },
    { field: "kuantitas", headerName: "QUANTITY", width: 120 },
    { 
      field: "status", 
      headerName: "STATUS", 
      width: 120, 
      renderCell: (params) => (
        <Chip label={params.value} color={getStatusColor(params.value)} />
      )
    },
    { 
      field: "actions", 
      headerName: "ACTIONS", 
      width: 150,
      renderCell: () => (
        <Box>
          <Visibility sx={{ cursor: "pointer", mx: 1, color: "gray" }} />
          <Edit sx={{ cursor: "pointer", mx: 1, color: "blue" }} />
          <Delete sx={{ cursor: "pointer", mx: 1, color: "red" }} />
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField 
          label="Search records..." 
          variant="outlined" 
          size="small" 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="small">
          <MenuItem value="user">Sort by (User Info)</MenuItem>
          <MenuItem value="date">Sort by (Create Date)</MenuItem>
        </Select>
      </Box>

      <DataGrid 
        rows={filteredInvoices} 
        columns={columns} 
        getRowId={(row) => row.invoiceId}
        pageSize={5}
      />
    </Box>
  );
};

export default InvoiceTable;
