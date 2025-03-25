import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
} from "@mui/material";
import { Search, Edit, Delete, Visibility } from "@mui/icons-material";

const products = [
  {
    id: 1,
    name: "Apple MacBook Pro",
    category: "Electronics, Laptop",
    price: "$14.59",
    quantity: 70,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Apple Series 4 GPS A38 MM",
    category: "Fashion, Watch",
    price: "$275",
    quantity: 3,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Apple iPhone 13 Mini",
    category: "Electronics, Iphone",
    price: "$86.99",
    quantity: 40,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Boat On-Ear Wireless",
    category: "Electronics, Headphones",
    price: "$81.99",
    quantity: 45,
    status: "Out of Stock",
  },
];

const ProductList = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <Box p={3} minHeight="500px" width="1120px">
      <Typography variant="h4" mb={5}>
        Product List
      </Typography>

      {/* Search and Add Product */}
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

        {/* Tombol Add Product dengan navigasi ke /addproduct */}
        <Button variant="contained" color="primary" onClick={() => navigate("/addproduct")}>
          + Add Product
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>Product Detail</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Typography
                    color={product.status === "In Stock" ? "green" : "red"}
                  >
                    {product.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton color="secondary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
