// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:4322/api/categories";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kategori, setKategori] = useState("");

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setKategori(response.data.kategori);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`${API_URL}/${id}`, { kategori });
            navigate("/category");
        } catch (error) {
            console.error("Error editing category:", error);
        }
    };

    return (
        <Dialog open={true} onClose={() => navigate("/")}>
            <DialogTitle>Edit Category</DialogTitle>
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
                <Button onClick={() => navigate("/category")}>Cancel</Button>
                <Button onClick={handleEdit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategory;
