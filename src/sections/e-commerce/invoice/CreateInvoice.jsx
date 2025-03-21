import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Typography,
  Paper,
  IconButton,
  DialogTitle,
  DialogContent,
  List,
  Dialog,
  ListItem,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_DUMMY } from "../../../utils/api";
import { useParams } from "react-router-dom";

const CreateInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    invoiceId: Date.now(),
    status: "",
    date: new Date().toISOString().split("T")[0],
    duoDate: "",
    from: {},
    to: {},
    items: [{ nama: "", deskripsi: "", jumlah: 1, harga: "" }],
  });
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");
  const [isSelectingTo, setIsSelectingTo] = useState(false);

  useEffect(() => {
    fetchInvoiceData();
    fetchAddresses();
  }, []);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/orders/${id}`);
      setInvoice((prev) => ({
        ...prev,
        from: response.data,
        to: response.data, 
      }));
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/orders`);
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][field] = value;
    setInvoice({ ...invoice, items: updatedItems });
  };
 
  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { nama: "", deskripsi: "", jumlah: 1, harga: "" }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_DUMMY}/api/invoices/create`, invoice);
      alert("Invoice created successfully!");
    } catch (error) {
      alert("Failed to create invoice. Please try again.");
    }
  };

  const handleSelectAddress = (address) => {
    if (isSelectingTo) {
      setInvoice({ ...invoice, to: address });
    } else {
      setInvoice({ ...invoice, from: address });
    }
    setOpen(false);
  };
  const filteredAddresses = addresses.filter((addr) =>
    addr.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container component={Paper} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Invoice
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField  label="Invoice ID" fullWidth disabled value={invoice.invoiceId} />
        </Grid>
        <Grid item xs={6}>
          <Select
            value={invoice.status}
            onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="di tunda">di tunda</MenuItem>
            <MenuItem value="di bayar">di bayar</MenuItem>
            <MenuItem value="selesai">selesai</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={invoice.date}
            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={invoice.duoDate}
            onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">From:</Typography>
          <Typography>{invoice.from.nama}</Typography>
          <Typography>{invoice.from.alamat}</Typography>
          <Typography>{invoice.from.phone}</Typography>
          <Typography>{invoice.from.email}</Typography>
          <Button onClick={() => {setIsSelectingTo(false); setOpen(true)}}>Change</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">To:</Typography>
          <Typography>{invoice.to.nama}</Typography>
          <Typography>{invoice.to.alamat}</Typography>
          <Typography>{invoice.to.phone}</Typography>
          <Typography>{invoice.to.email}</Typography>
          <Button onClick={() => {setIsSelectingTo(true); setOpen(true)}} variant="contained" sx={{ ml: "500px" }}>+</Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() =>setOpen(false)} fullWidth>
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Select Address</Typography>
          <Button variant="text" color="primary">
            + Add New
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />
        <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {filteredAddresses.map((addr) => (
            <ListItem
              button
              key={addr.id}
              onClick={() => handleSelectAddress(addr)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                mb: 1,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {addr.nama}
              </Typography>
              <Typography variant="body2">{addr.alamat}</Typography>
              <Typography variant="body2">{addr.phone}</Typography>
              <Typography variant="body2">{addr.email}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Details
      </Typography>
      {invoice.items.map((item, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={3}>
            <TextField
              label="Item Nama"
              fullWidth
              value={item.nama}
              onChange={(e) => handleItemChange(index, "nama", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="deskripsi"
              fullWidth
              value={item.deskripsi}
              onChange={(e) => handleItemChange(index, "deskripsi", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Jumlah"
              type="number"
              fullWidth
              value={item.jumlah}
              onChange={(e) => handleItemChange(index, "jumlah", e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Harga"
              type="number"
              fullWidth
              value={item.harga}
              onChange={(e) => handleItemChange(index, "harga", e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton color="error" onClick={() => removeItem(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={addItem} sx={{ mt: 2 }} variant="outlined">
        + Add Item
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ mt: 3, float: "right" }}
      >
        Create Invoice
      </Button>
    </Container>
  );
};

export default CreateInvoice;
