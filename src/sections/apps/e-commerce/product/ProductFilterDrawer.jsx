// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ProductFilterDrawer = ({ openFilterDrawer, handleDrawerOpen, setFilter }) => {
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <h2>Product Filter</h2>
      <button onClick={handleDrawerOpen}>
        {openFilterDrawer ? 'Close Filter' : 'Open Filter'}
      </button>
      <button onClick={() => handleFilterChange('new-filter-value')}>
        Apply Filter
      </button>
    </div>
  );
};

ProductFilterDrawer.propTypes = {
  openFilterDrawer: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,  
};

export default ProductFilterDrawer;
