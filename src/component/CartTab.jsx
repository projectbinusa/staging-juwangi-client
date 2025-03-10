import { Paper, Typography, Grid, CardMedia, Box } from "@mui/material";

export default function CartTab({ cart }) {
  const validCart = Array.isArray(cart) ? cart : [];

  return (
    <Grid container spacing={2}>
      {validCart.length === 0 ? (
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h6" color="textSecondary">
            Keranjang Anda kosong.
          </Typography>
        </Grid>
      ) : (
        validCart.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Paper 
              sx={{ 
                p: 2, 
                boxShadow: 3, 
                borderRadius: 2, 
                transition: "0.3s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 5 }
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={item?.gambar || ""}
                alt={item?.nama || "Product Image"}
                sx={{ borderRadius: 1, objectFit: "cover" }}
              />
              <Box mt={1}>
                <Typography variant="h6">{item.nama}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Kategori: {item.kategori}
                </Typography>
                <Typography variant="body2">Stok: {item.stok}</Typography>
                <Typography variant="h6" color="primary">
                  Rp{(item.harga || 0).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.deskripsi}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  );
}
