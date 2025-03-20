import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../utils/api";

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    from: {},
    to: {},
    items: [],
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    status: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/orders`)
      .then((res) => setAddresses(res.data))
      .catch(() => setAddresses([]));
  }, []);

  const handleSelectAddress = (address) => {
    setInvoice({ ...invoice, from: address });
    setOpen(false);
  };

  const handleSubmit = () => {
    axios
      .post(`${API_DUMMY}/api/products/add`, invoice)
      .then(() => alert("Invoice Created Successfully"))
      .catch(() => alert("Error Creating Invoice"));
  };

  return (
    <Container>
      <Typography variant="h4">New Invoice</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">From:</Typography>
          <Typography>{invoice.from.nama || "Select Address"}</Typography>
          <Typography>{invoice.from.alamat}</Typography>
          <Typography>{invoice.from.phone}</Typography>
          <Typography>{invoice.from.email}</Typography>
          <Button onClick={() => setOpen(true)}>Change</Button>
        </CardContent>
      </Card>
      <TextField
        label="Date"
        type="date"
        value={invoice.date}
        onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Invoice
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent>
          <List>
            {addresses.map((addr) => (
              <ListItem button key={addr.id} onClick={() => handleSelectAddress(addr)}>
                <ListItemText primary={addr.name} secondary={addr.address} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InvoiceForm;
