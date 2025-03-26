import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Grid,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  return (
    <Card sx={{ 
      maxWidth: 800,
      margin: 'auto',
      padding: 3,
      boxShadow: 3,
      borderRadius: 2, 
      }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Payment Method
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        sx={{ my: 2 }}
      >
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
          value="seaBank"
          control={<Radio />}
          label={<Typography>Pay with SeaBank</Typography>}
        />
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label={<Typography>Cash on Delivery</Typography>}
        />
      </RadioGroup>

      {(paymentMethod === "creditCard" || paymentMethod === "seaBank") && (
        <Box>
          <TextField fullWidth label="Card Number" variant="outlined" margin="dense" sx={{ borderRadius: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Expiry Date" placeholder="MM/YY" variant="outlined" margin="dense" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="CVV" variant="outlined" margin="dense" />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            InputProps={{ startAdornment: <LockIcon sx={{ mr: 1 }} /> }}
          />
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" sx={{ px: 3 }}>Cancel</Button>
        <Button variant="contained" color="primary" sx={{ px: 3 }}>
          Save
        </Button>
      </Box>
    </Card>
  );
};

export default PaymentMethod;
