import React, { useState } from "react";
import { Box, Button, Card, TextField, Typography, Radio, RadioGroup, FormControlLabel, IconButton } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  return (
    <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Martin Shaw <Typography component="span" color="textSecondary">(Office)</Typography>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            1654 Zideh Plz, 27 Elabe Trail, Kentucky, KGambia - HS6N 5ATkkk
          </Typography>
          <Typography variant="body2" color="textSecondary">(939) 513-8172</Typography>
        </Box>
        <IconButton>
          <HomeIcon />
        </IconButton>
      </Box>

      <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} sx={{ my: 2 }}>
        <FormControlLabel
          value="creditCard"
          control={<Radio />}
          label={
            <Box display="flex" alignItems="center">
              <CreditCardIcon color="primary" sx={{ mr: 1 }} /> Credit Card
            </Box>
          }
        />
        <FormControlLabel
          value="paypal"
          control={<Radio />}
          label={<Typography>Pay with PayPal</Typography>}
        />
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label={<Typography>Cash on Delivery</Typography>}
        />
      </RadioGroup>

      {paymentMethod === "creditCard" && (
        <Box>
          <TextField fullWidth label="Card Number" variant="outlined" margin="dense" />
          <Box display="flex" gap={2}>
            <TextField fullWidth label="Expiry Date" placeholder="MM/YY" variant="outlined" margin="dense" />
            <TextField fullWidth label="CVV" variant="outlined" margin="dense" />
          </Box>
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" InputProps={{ startAdornment: <LockIcon sx={{ mr: 1 }} /> }} />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary">Save</Button>
      </Box>
    </Card>
  );
};

export default PaymentMethod;
