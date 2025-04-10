// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Search, Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../utils/api";

const ProductList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectAll = (event) => {
    setSelectedProducts(event.target.checked ? products.map((p) => p.id) : []);
  };

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // ✏️ **Edit Produk**
  const handleEditClick = (product) => {
    setEditProduct(product);
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `${API_DUMMY}/api/products/${editProduct.id}`,
        editProduct
      );
      setOpenEditModal(false);
      fetchProducts();
      Swal.fire("Updated!", "Product has been updated.", "success");
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update product.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_DUMMY}/api/products/${id}`);
          fetchProducts();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error", "Failed to delete product.", "error");
        }
      }
    });
  };

  return (
    <Box p={3} minHeight="500px" width="1120px">
      <Typography variant="h4" mb={5}>
        Product List
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <OutlinedInput
          placeholder="Search products..."
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addproduct")}
        >
          + Add Product
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelect(product.id)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.nama || "No Name"}</TableCell>
                <TableCell>{product.deskripsi || "No Description"}</TableCell>
                <TableCell>
                  Rp {product.harga?.toLocaleString("id-ID") || "0"}
                </TableCell>
                <TableCell>
                  {product.stok > 0 ? (
                    <Chip
                      label="In Stock"
                      color="success"
                      sx={{ fontWeight: "bold", fontSize: "14px", px: 2 }}
                    />
                  ) : (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      sx={{ fontWeight: "bold", fontSize: "14px", px: 2 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {product.gambar && product.gambar !== "string" ? (
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      width="50"
                      height="50"
                      style={{ borderRadius: "5px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleEditClick(product)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { width: "600px", padding: "20px" } }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "22px" }}
        >
          Edit Product
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="nama"
            value={editProduct?.nama || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            name="deskripsi"
            value={editProduct?.deskripsi || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
          <TextField
            label="Price"
            name="harga"
            type="number"
            value={editProduct?.harga || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Stock"
            name="stok"
            type="number"
            value={editProduct?.stok || ""}
            onChange={handleEditChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "space-between", px: "20px", pb: "15px" }}
        >
          <Button
            onClick={() => setOpenEditModal(false)}
            sx={{ color: "red", fontWeight: "bold" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            sx={{ backgroundColor: "#007bff", fontWeight: "bold" }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
