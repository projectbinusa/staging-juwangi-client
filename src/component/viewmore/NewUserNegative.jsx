// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const dummyUsers = [
  {
    id: 1,
    username: "johndoe",
    email: "johndoe@example.com",
    joined_at: "2025-04-10",
    status: "active",
  },
  {
    id: 2,
    username: "janedoe",
    email: "janedoe@example.com",
    joined_at: "2025-04-11",
    status: "pending",
  },
  {
    id: 3,
    username: "alicesmith",
    email: "alice@example.com",
    joined_at: "2025-04-09",
    status: "inactive",
  },
  {
    id: 4,
    username: "bobbuilder",
    email: "bob@example.com",
    joined_at: "2025-04-08",
    status: "active",
  },
];

const ViewMoreNewUsers = () => {
  const renderStatusChip = (status) => {
    const color =
      status === "active"
        ? "success"
        : status === "pending"
        ? "warning"
        : "error";
    return <Chip label={status} color={color} variant="outlined" size="small" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Detail New Users
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          mt: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Joined Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyUsers.map((user, index) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joined_at || "N/A"}</TableCell>
                <TableCell>{renderStatusChip(user.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewMoreNewUsers;
