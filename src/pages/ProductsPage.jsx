import { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import ProductCard from '../component/cards/e-commerce/ProductCard';
import ProductFilterDrawer from '../sections/apps/e-commerce/product/ProductFilterDrawer';
import SkeletonProductPlaceholder from '../component/skeleton/ProductPlaceholder';
import ProductsHeader from '../sections/apps/e-commerce/product/ProductsHeader';
import ProductEmpty from '../sections/apps/e-commerce/product/ProductEmpty';
import { filterProducts } from '../api/product';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'container' })(({ theme, open, container }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  }),
  marginLeft: -320,
  ...(container && {
    [theme.breakpoints.only('lg')]: {
      marginLeft: !open ? -240 : 0,
    },
  }),
  [theme.breakpoints.down('lg')]: {
    paddingLeft: 0,
    marginLeft: 0,
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: 0,
  }),
}));

const ProductsPage = () => {
  const theme = useTheme(); // Menarik tema yang digunakan dalam aplikasi
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    sort: 'low',
    categories: ['all'],
    price: '',
    rating: 0,
  });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };

  const filterData = async () => {
    setLoading(true); // Set loading to true before fetching
    const response = await filterProducts(filter);
    setProducts(response.data);
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    filterData();
  }, [filter]);

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.paper }}> {/* Menggunakan theme untuk background */}
      <ProductFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Main open={openFilterDrawer}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <ProductsHeader handleDrawerOpen={handleDrawerOpen} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isLoading
                ? Array.from({ length: 8 }).map((_, idx) => (
                    <Grid key={idx} item xs={12} sm={6} md={4}>
                      <SkeletonProductPlaceholder />
                    </Grid>
                  ))
                : products.length > 0
                ? products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                      <ProductCard product={product} />
                    </Grid>
                  ))
                : (
                  <Grid item xs={12}>
                    <ProductEmpty />
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
};

export default ProductsPage;
