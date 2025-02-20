// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Stack, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes untuk validasi props

const EditUser = ({ users, updateUser }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Cari pengguna berdasarkan userId
  const user = users.find(user => user.id === parseInt(userId));
  
  // Pastikan untuk memanggil useState sebelum pengecekan if
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [contact, setContact] = useState(user ? user.contact : '');
  const [avatar, setAvatar] = useState(user ? user.avatar : '');

  // Jika pengguna tidak ditemukan
  if (!user) {
    return <Typography>User not found!</Typography>;
  }

  // Fungsi untuk menyimpan perubahan data pengguna
  const handleSubmit = () => {
    const updatedUser = { ...user, name, email, contact, avatar };
    updateUser(updatedUser);  // Panggil fungsi updateUser untuk memperbarui data pengguna
    navigate('/');  // Kembali ke halaman utama setelah menyimpan perubahan
  };

  return (
    <Box sx={{ padding: 3, marginLeft: '500px', }}>
      <Typography variant="h5">Edit User</Typography>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}  // Update state ketika input berubah
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Update state ketika input berubah
        />
        <TextField
          label="Contact"
          variant="outlined"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)}  // Update state ketika input berubah
        />
        <TextField
          label="Avatar URL"
          variant="outlined"
          fullWidth
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}  // Update state ketika input berubah
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

// Menambahkan PropTypes untuk validasi props
EditUser.propTypes = {
  users: PropTypes.array.isRequired,        // 'users' harus berupa array dan wajib ada
  updateUser: PropTypes.func.isRequired,    // 'updateUser' harus berupa fungsi dan wajib ada
};

export default EditUser;
