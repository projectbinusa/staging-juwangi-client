import { Box ,Grid} from "iconsax-react";
import CreateInvoice from "../../sections/e-commerce/invoice/CreateInvoice"

function Invoice() {
    return(
        <Box sx={{ flex: 1, p: 2 }}>
            <Grid container spacing={2}>
                    <CreateInvoice/>
            </Grid>
        </Box>
    )
}

export default Invoice