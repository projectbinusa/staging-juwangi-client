import { useState, useContext } from "react";
import { Button, Card, CardContent, TextField, ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import MastercardIcon from "@mui/icons-material/CreditCard";
import PaypalIcon from "@mui/icons-material/AccountBalanceWallet";
import { ThemeContext } from "../../ThemeContext";

const PaymentPage = () => {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === "dark";

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([
    { id: 1, name: "Selena Litten", number: "**** **** **** 3456", type: "mastercard" },
    { id: 2, name: "Stebin Ben", number: "**** **** **** 7654", type: "visa" },
  ]);
  const [paypalEmail, setPaypalEmail] = useState("stebin.ben@paypal.co");

  const handlePaymentMethodChange = (_, newMethod) => {
    if (newMethod) setPaymentMethod(newMethod);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 500,
        margin: "auto",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
        borderRadius: 10,
      }}
    >
      <h3 style={{ color: isDarkMode ? "#fff" : "#000" }}>Payment</h3>
      <ToggleButtonGroup
        value={paymentMethod}
        exclusive
        onChange={handlePaymentMethodChange}
        style={{ marginBottom: 20 }}
      >
        <ToggleButton value="card" style={{ color: isDarkMode ? "#fff" : "#000" }}>
          <MastercardIcon /> Card
        </ToggleButton>
        <ToggleButton value="paypal" style={{ color: isDarkMode ? "#fff" : "#000" }}>
          <PaypalIcon /> Paypal
        </ToggleButton>
      </ToggleButtonGroup>

      {paymentMethod === "card" ? (
        <>
          {cards.map((card) => (
            <Card
              key={card.id}
              style={{
                backgroundColor: isDarkMode ? "#1e1e1e" : "#f5f5f5",
                color: isDarkMode ? "#fff" : "#000",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                padding: 10,
              }}
            >
              <input
                type="radio"
                name="card"
                checked={selectedCard === card.id}
                onChange={() => setSelectedCard(card.id)}
                style={{ marginRight: 10 }}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <div>{card.name}</div>
                <div>{card.number}</div>
              </CardContent>
              <IconButton onClick={() => handleDeleteCard(card.id)} style={{ color: isDarkMode ? "#fff" : "#000" }}>
                <Delete />
              </IconButton>
            </Card>
          ))}
          <Button variant="contained" startIcon={<Add />} style={{ backgroundColor: "#4a90e2", color: "#fff" }}>
            Add New Card
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            style={{ backgroundColor: isDarkMode ? "#1e1e1e" : "#f5f5f5", color: isDarkMode ? "#fff" : "#000", marginBottom: 10 }}
            InputLabelProps={{ style: { color: isDarkMode ? "#fff" : "#000" } }}
            InputProps={{ style: { color: isDarkMode ? "#fff" : "#000" } }}
          />
        </>
      )}

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        <Button variant="text" style={{ color: "red" }}>
          Cancel
        </Button>
        <Button variant="contained" style={{ backgroundColor: "#4a90e2", color: "#fff" }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;