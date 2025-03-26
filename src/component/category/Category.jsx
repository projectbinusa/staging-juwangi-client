// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const API_URL = "http://localhost:4322/api/categories";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}/${id}`);
                    fetchCategories();
                    Swal.fire("Deleted!", "The category has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting category:", error);
                    Swal.fire("Error!", "Failed to delete category.", "error");
                }
            }
        });
    };

    return (
        <Box marginLeft="150px">
            <Typography variant="h4" gutterBottom>
                Category Management
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/addcategory")}
                sx={{ marginBottom: 2 }}
            >
                Add Category
            </Button>

            <TableContainer component={Paper} sx={{ width: "80%", maxWidth: 800 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><b>ID</b></TableCell>
                            <TableCell align="center"><b>Category</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell align="center">{category.id}</TableCell>
                                <TableCell align="center">{category.kategori}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/editcategory/${category.id}`)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDelete(category.id)}>
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

export default CategoryList;
