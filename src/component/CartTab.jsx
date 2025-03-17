import { useState, useEffect } from "react";
import { 
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Checkbox, 
  Box, Typography, IconButton, Button, Container
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_DUMMY } from "../utils/api";
import Swal from "sweetalert2";

export default function CartTable() {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_DUMMY}/api/cart`)
      .then(response => setCart(response.data))
      .catch(error => console.error("Error fetching cart data:", error));
  }, []);

  const deleteCart = async (id) => {
    try {
      await axios.delete(`${API_DUMMY}/api/cart/${id}`);
      setCart(cart.filter(item => item.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
      Swal.fire({ icon: "success", title: "Barang Berhasil Dihapus", timer: 1500 });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Gagal Menghapus Barang", timer: 1500 });
    }
  };

  const onUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => (item.id === id ? { ...item, kuantitas: newQuantity } : item)));
  };

  const handleSelectItem = (id) => {
    setSelectedItems(
      selectedItems.includes(id) 
        ? selectedItems.filter(itemId => itemId !== id) 
        : [...selectedItems, id]
    );
  };

  const calculateTotal = () => {
    return cart
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.harga * item.kuantitas, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire({ 
        icon: "warning",
        title: "Pilih minimal 1 item untuk checkout",
        timer: 1500 });
      return;
    }
    Swal.fire({ 
      icon: "success", 
      title: `Checkout Berhasil! Total: Rp${calculateTotal().toLocaleString()}`, 
      timer: 2000 });
    setCart(cart.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <Container sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Keranjang Belanja</Typography>

      <TableContainer 
        component={Paper} 
        sx={{ width: "100%", boxShadow: 4, borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedItems.length > 0 && selectedItems.length < cart.length}
                  checked={cart.length > 0 && selectedItems.length === cart.length}
                  onChange={() => setSelectedItems(selectedItems.length === cart.length ? [] : cart.map(item => item.id))}
                />
              </TableCell>
              <TableCell>Produk</TableCell>
              <TableCell>Harga Satuan</TableCell>
              <TableCell>Kuantitas</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>

          <TableBody> 
            {cart.length > 0 ? (
              cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        style={{ width: 70, height: 70, borderRadius: 8, marginRight: 15 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">{item.nama}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.deskripsi}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ textDecoration: "line-through", color: "gray", fontSize: "0.9rem" }}>
                      Rp{item.harga.toLocaleString()}
                    </Typography>
                    <Typography fontWeight="bold">Rp{item.harga.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <IconButton 
                        size="small" 
                        sx={{ border: "1px solid gray", borderRadius: "50%" }} 
                        onClick={() => onUpdateQuantity(item.id, item.kuantitas - 1)}
                        disabled={item.kuantitas <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2, fontWeight: "bold" }}>{item.kuantitas}</Typography>
                      <IconButton 
                        size="small" 
                        sx={{ border: "1px solid gray", borderRadius: "50%" }} 
                        onClick={() => onUpdateQuantity(item.id, item.kuantitas + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell fontWeight="bold">
                    Rp{(item.harga * item.kuantitas).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => deleteCart(item.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="h6" color="textSecondary">
                    Keranjang belanja kosong.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ p: 3, backgroundColor: "#f8f9fa", borderRadius: 2, boxShadow: 2, mt: 3 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Total: Rp{calculateTotal().toLocaleString()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5, fontSize: "1rem", borderRadius: 2 }}
          disabled={selectedItems.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  );
}
