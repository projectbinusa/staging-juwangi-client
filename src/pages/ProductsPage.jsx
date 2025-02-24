// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import ProductCategory from '../component/cards/e-commerce/ProductCategory';

const allProducts = [
  { name: 'Product 1', description: 'Electronics product', price: '$39.99', image: 'https://via.placeholder.com/300', category: 'Electronics' },
  { name: 'Product 2', description: 'Home appliance', price: '$59.99', image: 'https://via.placeholder.com/300', category: 'Home' },
  { name: 'Product 3', description: 'Fashion item', price: '$19.99', image: 'https://via.placeholder.com/300', category: 'Fashion' },
  { name: 'Product 4', description: 'Gadget', price: '$79.99', image: 'https://via.placeholder.com/300', category: 'Electronics' },
  { name: 'Product 5', description: 'Toy', price: '$9.99', image: 'https://via.placeholder.com/300', category: 'Toys' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Toys'];

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  // Fungsi untuk menangani klik tombol Add Product di setiap produk
  const handleAddProduct = (productName) => {
    console.log(`${productName} added to the cart!`);
    // Kamu bisa menambahkan logika untuk menambahkan produk ke keranjang atau daftar produk lainnya
  };

  return (
    <Container>
      <Box sx={{ mb: 2 }}>
        <ProductCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </Box>

      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.name}>
              <Card>
                <CardMedia component="img" height="200" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                  <Typography variant="body1" color="text.primary">{product.price}</Typography>

                  {/* Tombol Add Product di setiap produk */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddProduct(product.name)} // Kirimkan nama produk saat tombol diklik
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPage;
