// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Container, Typography } from '@mui/material';

export default function CartEmpty() {
  return (
    <Container sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h5" color="textSecondary">
        Keranjang Anda kosong.
      </Typography>
    </Container>
  );
}
