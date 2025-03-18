// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const API_URL = "http://localhost:4322/api/categories";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div>
            <h2>Category Management</h2>
            <Button variant="contained" color="primary" onClick={() => navigator()}>
                Add Category
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.kategori}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => { setSelectedCategory(category); setOpenEdit(true); }}>
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
            <AddCategory open={openAdd} onClose={() => setOpenAdd(false)} refresh={fetchCategories} />
            <EditCategory open={openEdit} onClose={() => setOpenEdit(false)} category={selectedCategory} refresh={fetchCategories} />
        </div>
    );
};

export default CategoryList;
