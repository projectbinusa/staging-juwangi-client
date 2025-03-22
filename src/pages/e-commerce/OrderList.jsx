// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
} from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      items: 3,
      total: "$150.00",
      status: "Completed",
      date: "18 Mar 2025",
      payment: "Credit Card",
      address: "123 Main St, New York",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      items: 5,
      total: "$250.00",
      status: "Pending",
      date: "17 Mar 2025",
      payment: "PayPal",
      address: "456 Elm St, Los Angeles",
    },
    {
      id: "ORD003",
      customer: "Michael Johnson",
      items: 2,
      total: "$300.00",
      status: "Completed",
      date: "16 Mar 2025",
      payment: "Bank Transfer",
      address: "789 Oak St, Chicago",
    },
  ]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    name: "",
    items: "",
    payment: "",
    address: "",
  });
  const [deleteMode, setDeleteMode] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState({
    id: "",
    customer: "",
    items: "",
    payment: "",
    address: "",
  });

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

  const handleCheckboxChange = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedOrders.length === 0) {
      Swal.fire("Oops!", "Pilih pesanan terlebih dahulu!", "warning");
      return;
    }

    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Pesanan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
        setSelectedOrders([]);
        setDeleteMode(false);
        Swal.fire("Terhapus!", "Pesanan berhasil dihapus.", "success");
      }
    });
  };

  const handleAddOrder = () => {
    console.log("Menambahkan order...", newOrder);

    if (
      !newOrder.name ||
      !newOrder.items ||
      !newOrder.payment ||
      !newOrder.address
    ) {
      Swal.fire("Oops!", "Semua field harus diisi!", "warning");
      return;
    }

    const newId = `ORD00${orders.length + 1}`;
    const today = new Date().toISOString().split("T")[0];

    const newOrderData = {
      id: newId,
      customer: newOrder.name,
      items: Number(newOrder.items),
      total: `$${Number(newOrder.items) * 50}.00`,
      status: "Pending",
      date: today,
      payment: newOrder.payment,
      address: newOrder.address,
    };

    setOrders([...orders, newOrderData]);

    setNewOrder({ name: "", items: "", payment: "", address: "" });
    setOpenModal(false);
    Swal.fire("Berhasil!", "Pesanan berhasil ditambahkan.", "success");
  };

  const handleEditClick = (order) => {
    setEditOrder(order);
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    const updatedOrder = {
      ...editOrder,
      total: `$${Number(editOrder.items) * 50}.00`, // Hitung ulang total harga
    };

    setOrders(
      orders.map((order) => (order.id === editOrder.id ? updatedOrder : order))
    );
    setOpenEditModal(false);
    Swal.fire("Success!", "Order has been updated.", "success");
  };

  return (
    <Box p={4} sx={{ minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        Order List
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Add order
        </Button>
        <Button
          variant="contained"
          color={deleteMode ? "secondary" : "error"}
          startIcon={<DeleteIcon />}
          onClick={() => {
            setDeleteMode(!deleteMode);
            setSelectedOrders([]);
          }}
        >
          {deleteMode ? "Batal Hapus" : "Delete"}
        </Button>
        {deleteMode && selectedOrders.length > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
          >
            Hapus {selectedOrders.length} Pesanan
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "12px", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {deleteMode && <TableCell>Pilih</TableCell>}
              <TableCell>#</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                {deleteMode && (
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </TableCell>
                )}
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{ px: 2 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "#1976d2" }}
                    onClick={() => handleEditClick(order)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            color: "text.primary",
            margin: "auto",
            mt: 10,
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Order
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newOrder.name}
            onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Items"
            type="number"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newOrder.items}
            onChange={(e) =>
              setNewOrder({ ...newOrder, items: e.target.value })
            }
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Payment</InputLabel>
            <Select
              value={newOrder.payment}
              onChange={(e) =>
                setNewOrder({ ...newOrder, payment: e.target.value })
              }
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            sx={{ mb: 2 }}
            value={newOrder.address}
            onChange={(e) =>
              setNewOrder({ ...newOrder, address: e.target.value })
            }
          />

          <Button variant="contained" fullWidth onClick={handleAddOrder}>
            Add Order
          </Button>
        </Box>
      </Modal>

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            color: "text.primary",
            margin: "auto",
            mt: 10,
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Order
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            name="customer"
            value={editOrder.customer}
            onChange={handleEditChange}
          />

          <TextField
            fullWidth
            label="Items"
            type="number"
            variant="outlined"
            sx={{ mb: 2 }}
            name="items"
            value={editOrder.items}
            onChange={handleEditChange}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Payment</InputLabel>
            <Select
              name="payment"
              value={editOrder.payment}
              onChange={handleEditChange}
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="PayPal">PayPal</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            sx={{ mb: 2 }}
            name="address"
            value={editOrder.address}
            onChange={handleEditChange}
          />

          <Button variant="contained" fullWidth onClick={handleSaveEdit}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderList;
