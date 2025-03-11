import { Paper, Typography, Button, Box, Divider, List, ListItem, ListItemText } from "@mui/material";

export default function CheckoutTab({ cart }) {
  const total = Array.isArray(cart) 
    ? cart.reduce((sum, item) => sum + (item.harga || 0), 0)
    : 0;

  return (
    <Paper 
      sx={{ 
        p: 3, 
        boxShadow: 4, 
        borderRadius: 2, 
        backgroundColor: "#f9f9f9",
        height: "77vh",
        display: "flex", 
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Checkout
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "65vh", mt: 2 }}>
        <List>
          {cart.length === 0 ? (
            <Typography variant="body1" color="textSecondary" textAlign="center">
              Tidak ada produk di keranjang.
            </Typography>
          ) : (
            cart.map((item, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText 
                    primary={`${item.nama} (x1)`}
                    secondary={`Rp${(item.harga || 0).toLocaleString()}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          )}
        </List>
      </Box>


      <Typography variant="body1" color="textSecondary" mt={2} textAlign="center">
        Total:
      </Typography>
      <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
        Rp{total.toLocaleString()}
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2, borderRadius: 2 }}
      >
        CHECKOUT
      </Button>
    </Paper>
  );
}
