
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/ProductCard";
import { Container, Grid, Typography, TextField, Box, Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add"; 
import axios from "axios";
import { API_DUMMY } from "../../utils/api"; // Mengimpor API_DUMMY

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/products`); // Menggunakan API_DUMMY
        setProducts(response.data); 
      } catch (err) {
        setError("Failed to fetch products"); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category === selectedCategory)
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
        Products
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/categories")}
        sx={{ marginBottom: 2 }}
      >
        ADD CATEGORIES
      </Button>

      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <TextField
          variant="outlined"
          placeholder="Search product..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "300px",
            bgcolor: "white",
            borderRadius: "5px",
          }}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          sx={{ bgcolor: "white", borderRadius: "5px", width: "200px" }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.kategori}>
              {category.kategori}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" sx={{ height: "56px" }}>
          <SearchIcon />
      <Box 
        mb={3} 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        width="80%"
      >
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<AddIcon />} 
          onClick={() => navigate("/products/add")} 
        >
          Tambah Produk
        </Button>

        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            variant="outlined"
            placeholder="Search product..."
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "300px",
              bgcolor: "white",
              borderRadius: "5px",
            }}
          />
          <Button variant="contained" color="primary" sx={{ height: "56px" }}>
            <SearchIcon />
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Product not found</Typography>
        )}
      </Grid>
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">Product not found</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Product;
