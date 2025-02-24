// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@mui/material';

const ProductCategoryList = ({ categories, selectedCategory, onCategoryChange }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State untuk menu dropdown

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Membuka menu dropdown
  };

  const handleClose = () => {
    setAnchorEl(null); // Menutup menu dropdown
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category); // Menyimpan kategori yang dipilih
    setAnchorEl(null); // Menutup menu setelah memilih kategori
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick} // Klik tombol untuk membuka menu dropdown
        fullWidth
      >
        {selectedCategory === 'All' ? 'Select Category' : selectedCategory}
      </Button>

      <Menu
        anchorEl={anchorEl} // Mengaitkan menu dengan tombol
        open={Boolean(anchorEl)} // Menampilkan menu jika tombol diklik
        onClose={handleClose} // Menutup menu
      >
        <MenuItem onClick={() => handleCategorySelect('All')}>All Products</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} onClick={() => handleCategorySelect(category)}>
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

// Validasi prop
ProductCategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,  // categories adalah array string
  selectedCategory: PropTypes.string.isRequired,  // selectedCategory adalah string
  onCategoryChange: PropTypes.func.isRequired,  // onCategoryChange adalah fungsi
};

export default ProductCategoryList;
