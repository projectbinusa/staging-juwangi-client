// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
  TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleOpen = (cat = "", id = null) => {
    setCategory(cat);
    setEditId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setEditId(null);
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, { title: category });
      } else {
        await axios.post(API_URL, { title: category });
      }
      fetchCategories();
      setSnackbar({ open: true, message: "Category saved successfully!", severity: "success" });
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
      setSnackbar({ open: true, message: "Failed to save category", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCategories();
        setSnackbar({ open: true, message: "Category deleted successfully!", severity: "success" });
      } catch (error) {
        console.error("Error deleting category:", error);
        setSnackbar({ open: true, message: "Failed to delete category", severity: "error" });
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h2>Category Management</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Category</Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.title}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(cat.title, cat.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(cat.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryPage;