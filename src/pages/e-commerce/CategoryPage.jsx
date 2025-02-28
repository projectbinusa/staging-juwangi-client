import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryManager() {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCategories();
    }, []);
    
    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
    };
    
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/categories/${id}`);
        fetchCategories();
    };
    
    const filteredCategories = categories.filter((category) =>
        category.kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <Container
            maxWidth={false}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "#121212",
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                overflowY: "auto",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Categories
            </Typography>
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate("/products")}
                sx={{ marginBottom: 2 }}
            >
                View Products
            </Button>

            <Box mb={3} display="flex" alignItems="center" gap={1}>
                <TextField
                    variant="outlined"
                    placeholder="Search category..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ width: "300px", bgcolor: "white", borderRadius: "5px" }}
                />
            </Box>
            
            <Button 
                variant="contained" 
                color="success" 
                onClick={() => navigate("/add-category")}
                sx={{ marginBottom: 3 }}
            >
                Add Category
            </Button>

            <Grid container spacing={3} justifyContent="center">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
                            <Box sx={{ border: "1px solid white", padding: 2, borderRadius: "8px", textAlign: "center" }}>
                                <Typography>{category.kategori}</Typography>
                                <Button onClick={() => navigate(`/edit-category/${category.id}`)} variant="contained" color="warning" sx={{ marginRight: 1 }}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(category.id)} variant="contained" color="error">
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6">Category not found</Typography>
                )}
            </Grid>
        </Container>
    );
}
