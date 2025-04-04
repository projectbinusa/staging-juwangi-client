// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:4322/api/categories";

const AddCategory = () => {
    const [kategori, setKategori] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await axios.post(API_URL, { kategori });
            Swal.fire({
                title: "Success!",
                text: "Category added successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            }).then(() => navigate("/category"));
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to add category.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            console.error("Error adding category:", error);
        }
    };

    return (
        <Dialog open={true} onClose={() => navigate("/")}> 
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category"
                    fullWidth
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigate("/")}>Cancel</Button>
                <Button onClick={handleAdd} variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCategory;