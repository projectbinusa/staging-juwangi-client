// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';  
import { Box, Typography, Button } from '@mui/material';

const ProductsHeader = ({ handleDrawerOpen }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4">Products</Typography>
      <Button variant="contained" onClick={handleDrawerOpen}>Filter</Button>
    </Box>
  );
};

ProductsHeader.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired, 
};

export default ProductsHeader;
