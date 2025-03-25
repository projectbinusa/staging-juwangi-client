// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:4322/api/categories";

const AddCategory = () => {
    const [kategori, setKategori] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await axios.post(API_URL, { kategori });
            navigate("/category"); 
        } catch (error) {
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
