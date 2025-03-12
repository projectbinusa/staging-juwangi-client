import { useState } from "react";
import { 
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Checkbox, 
  Box, Typography, IconButton, Button 
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartTable({ cart = [], onUpdateQuantity, onDelete }) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        marginTop: 2, 
        boxShadow: 3, 
        transition: "margin-left 0.3s ease",
        width: "100%" 
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell sx={{ width: { xs: "200px", sm: "300px", md: "600px" } }}>Produk</TableCell>
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
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
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
                      sx={{ border: "1px solid gray" }} 
                      onClick={() => onUpdateQuantity(item.id, item.kuantitas - 1)}
                      disabled={item.kuantitas <= 1}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.kuantitas}</Typography>
                    <IconButton 
                      size="small" 
                      sx={{ border: "1px solid gray" }} 
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
                    onClick={() => onDelete(item.id)}
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
  );
}
