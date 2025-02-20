// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Stack, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '../customer/Avatar';
import MainCard from '../customer/MainCard';
import IconButton from '../customer/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '+1 (123) 456-7890', status: 'Active', avatar: 'avatar-1.png' },
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', contact: '+1 (123) 456-7890', status: 'Active', avatar: 'avatar-1.png' },
    // data lainnya...
  ]);

  const navigate = useNavigate();

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Box sx={{ marginLeft:"230px", }}>
    <MainCard>
      <Button variant="contained" color="primary" sx={{ marginLeft: '20px', marginBottom: 2 }} onClick={() => navigate('/add')}>
        Add User
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar alt={user.name} size={40} src={`/images/${user.avatar}`} />
                    <span>{user.name}</span>
                  </Stack>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  <Chip label={user.status} color={user.status === 'Active' ? 'success' : 'error'} size="small" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => navigate(`/view/${user.id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/edit/${user.id}`)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(user.id)} color="error">
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
    </Box>
  );
};

export default UserList;
