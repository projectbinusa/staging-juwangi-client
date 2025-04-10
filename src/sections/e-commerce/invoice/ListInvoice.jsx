import axios from "axios";
import { useEffect, useState } from "react";
import { API_DUMMY } from "../../../utils/api";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { bool } from "prop-types";

function ListInvoice() {
  const [invoice, setInvoice] = useState([]);
   const { openDrawer } = useOutletContext(); 
  const getAllInvoice = async () => {
    try {
      const res = await axios.get(`${API_DUMMY}/api/invoices`);
      const invoices = res.data;

      // Ambil user info berdasarkan userId
      const invoicesWithUser = await Promise.all(
        invoices.map(async (inv) => {
          try {
            const userRes = await axios.get(`${API_DUMMY}/api/user/${inv.userId}`);
            return { ...inv, userInfo: userRes.data.name }; // Simpan nama user
          } catch {
            return { ...inv, userInfo: "Unknown User" };
          }
        })
      );

      setInvoice(invoicesWithUser);
    } catch (err) {
      alert("Terjadi Kesalahan: " + err);
    }
  };

  useEffect(() => {
    getAllInvoice();
  }, []);

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      minHeight: "100vh",
      paddingTop: "20px",
    }}>
    <Container
        component={Paper}
        sx={{
          p: 4,
          mb: 5,
          width: "90%",
          maxWidth: "1200px",
          marginLeft: openDrawer ? "250px" : "300px",
          color: "white",
        }}
      >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        List Invoice
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell><b>INVOICE ID</b></TableCell>
              <TableCell><b>USER INFO</b></TableCell>
              <TableCell><b>CREATE DATE</b></TableCell>
              <TableCell><b>DUE DATE</b></TableCell>
              <TableCell><b>QUANTITY</b></TableCell>
              <TableCell><b>STATUS</b></TableCell>
              <TableCell><b>ACTIONS</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell><Checkbox /></TableCell>
                <TableCell>{item.invoiceId}</TableCell>
                <TableCell>{item.userInfo}</TableCell>
                <TableCell>{new Date(item.createDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {item.items ? item.items.reduce((total, i) => total + i.quantity, 0) : 0}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: item.status === "Paid" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" color="warning" size="small">Edit</Button>
                    <Button variant="contained" color="error" size="small">Hapus</Button>
                    <Button variant="contained" color="primary" size="small">Detail</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </Box>
  );
}

export default ListInvoice;
