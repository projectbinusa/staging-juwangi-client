// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Typography, Button, Card, CardContent, Divider } from "@mui/material";

// Komponen untuk menampilkan daftar item dalam keranjang
const CheckoutTab = ({ cart }) => {
    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Keranjang Belanja
            </Typography>

            {/* Jika keranjang kosong */}
            {cart.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", color: "gray" }}>
                    Keranjang Anda masih kosong.
                </Typography>
            ) : (
                cart.map((item, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Harga: Rp {item.price.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Jumlah: {item.quantity}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}

            <Divider sx={{ my: 2 }} />

            {/* Tombol Checkout */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={cart.length === 0}
                onClick={() => alert("Melanjutkan ke pembayaran...")}
            >
                Checkout Sekarang
            </Button>
        </Box>
    );
};

export default CheckoutTab;
