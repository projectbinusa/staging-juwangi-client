// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; 
import { Box, Typography, Button } from '@mui/material';

const ProductEmpty = ({ handelFilter }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
      <Typography variant="h6">No products found</Typography>
      <Button onClick={handelFilter}>Reset Filters</Button>
    </Box>
  );
};

ProductEmpty.propTypes = {
  handelFilter: PropTypes.func.isRequired, 
};

export default ProductEmpty;
