// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';  

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'default-image.jpg'}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">{product.brand}</Typography>
        <Typography variant="body1">{`Price: $${product.price}`}</Typography>
        <Typography variant="body2">{`Rating: ${product.rating}`}</Typography>
        <Button variant="contained" color="primary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
