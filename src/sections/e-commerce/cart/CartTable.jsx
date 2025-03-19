import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  Box,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../utils/api';
import CartEmpty from './CartEmpty';

function CartTable() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`${API_DUMMY}/api/cart`);
        if (!response.ok) throw new Error('Gagal mengambil data cart');
        const data = await response.json();
        setProducts(data.map(item => ({...item,kuantitas: item.kuantitas || 1})));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_DUMMY}/api/cart/${id}`, { method: 'DELETE' });
      setProducts(products.filter((item) => item.id !== id));
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      Swal.fire({ icon: 'success', title: 'Barang berhasil dihapus!', timer: 1500 });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateKuantitas = (id, newKuantitas) => {
    if (newKuantitas < 1) return;
    setProducts(products.map(item => (item.id === id ? { ...item, kuantitas: newKuantitas } : item)));
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  if (!products.length) return <CartEmpty />;

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3, width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedItems.length > 0 && selectedItems.length < products.length}
                checked={selectedItems.length === products.length}
                onChange={() =>
                  setSelectedItems(selectedItems.length === products.length ? [] : products.map((item) => item.id))
                }
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
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <img src={item.gambar} alt={item.nama} style={{ width: 200, height: 50, borderRadius: 5, marginRight: 10 }} />
                  <Box>
                    <Typography fontWeight="bold">{item.nama}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.deskripsi}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Rp{item.harga?.toLocaleString()}</Typography>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <IconButton size="small" onClick={() => handleUpdateKuantitas(item.id, item.kuantitas - 1)} disabled={item.kuantitas <= 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 2, fontWeight: 'bold' }}>{item.kuantitas}</Typography>
                  <IconButton size="small" onClick={() => handleUpdateKuantitas(item.id, item.kuantitas + 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell fontWeight="bold">Rp{(item.harga * item.kuantitas).toLocaleString()}</TableCell>
              <TableCell align="center">
                <Button variant="text" color="error" onClick={() => handleDelete(item.id)} startIcon={<DeleteIcon />}>Hapus</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
