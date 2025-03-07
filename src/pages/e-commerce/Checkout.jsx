import Box from "@mui/material/Box";
import MainCard from "../../component/MainCard";
import CircularLoader from "../../component/CircularLoader";
import CheckoutTab from "../../sections/e-commerce/checkout/CheckOutTab";
import { useGetCart } from "../../api/Cart";

export default function Checkout() {
    // Panggil useGetCart
    const { isLoading: cartLoading, data: cart, error } = useGetCart();

    // Jika terjadi error, tampilkan pesan kesalahan
    if (error) {
        return (
            <MainCard>
                <Box sx={{ height: "calc(100vh - 310px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "red" }}>Terjadi kesalahan saat mengambil data keranjang.</p>
                </Box>
            </MainCard>
        );
    }

    // Jika masih loading, tampilkan loader
    if (cartLoading) {
        return (
            <MainCard>
                <Box sx={{ height: "calc(100vh - 310px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularLoader />
                </Box>
            </MainCard>
        );
    }

    // Jika cart kosong, tampilkan pesan bahwa keranjang kosong
    if (!cart || cart.length === 0) {
        return (
            <MainCard>
                <Box sx={{ height: "calc(100vh - 310px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p>Keranjang Anda kosong.</p>
                </Box>
            </MainCard>
        );
    }

    // Tampilkan komponen CheckoutTab jika data keranjang tersedia
    return <CheckoutTab cart={cart} />;
}
