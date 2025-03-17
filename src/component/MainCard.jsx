// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; 

import { Card, CardContent } from '@mui/material';

export default function MainCard({ children }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}


MainCard.propTypes = {
  children: PropTypes.node.isRequired, 
};
