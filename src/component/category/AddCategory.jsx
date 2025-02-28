import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
    const [kategori, setKategori] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4322/api/categories", { kategori });
            navigate("/categories");
        } catch (error) {
            console.error("Error adding category", error);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                bgcolor: "#121212",
                color: "white",
                padding: 4,
                borderRadius: "8px",
                textAlign: "center",
                marginTop: "50px",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Add Category
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Category Name"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    sx={{ bgcolor: "white", borderRadius: "5px", marginBottom: 2 }}
                />
                <Button type="submit" variant="contained" color="success">
                    Add Category
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate("/categories")} 
                    sx={{ marginLeft: 2 }}
                >
                    Cancel
                </Button>
            </Box>
        </Container>
    );
}
