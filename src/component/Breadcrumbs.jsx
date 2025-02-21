// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';

export default function Breadcrumbs({ heading }) {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>
      <Link color="inherit" to="/profile">
        Profile
      </Link>
      <span>{heading}</span>
    </MUIBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  heading: PropTypes.string.isRequired, 
};
