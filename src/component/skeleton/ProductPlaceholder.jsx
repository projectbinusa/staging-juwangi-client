// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Skeleton, Grid } from '@mui/material';

const SkeletonProductPlaceholder = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
      </Grid>
    </Grid>
  );
};

export default SkeletonProductPlaceholder;
