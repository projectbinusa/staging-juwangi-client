// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

const Notifications = () => {
  const notifications = [
    "Pengguna baru telah mendaftar! (150 orang)",
    "Perhatian: Stok produk A hampir habis!",
    "Diskon akhir bulan tersedia, segera manfaatkan!"
  ];

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notifikasi
        </Typography>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              {notification}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
