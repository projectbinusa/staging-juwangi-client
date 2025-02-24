// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Impor PropTypes dari package

import { Card, CardContent } from '@mui/material';

export default function MainCard({ children }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Menambahkan validasi untuk children
MainCard.propTypes = {
  children: PropTypes.node.isRequired, // 'children' adalah properti yang wajib dan bertipe node (berisi elemen React apa pun)
};
