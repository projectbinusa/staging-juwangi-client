import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../utils/api';

export default function ShippingInfo() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    tanggalLahir: '',
    phone: '',
    alamat: '',
    saveAddress: false
  });
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/orders`);
        setSavedAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_DUMMY}/api/orders`, formData);
      Swal.fire({
        icon: 'success',
        title: 'Data berhasil disimpan!',
        text: `Response: ${response.data.message || 'Pesanan telah dibuat'}`,
        timer: 2000
      });
      
      setSavedAddresses([...savedAddresses, formData]);
      setFormData({
        nama: '',
        email: '',
        tanggalLahir: '',
        phone: '',
        alamat: '',
        saveAddress: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan data!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan',
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      nama: '',
      email: '',
      tanggalLahir: '',
      phone: '',
      alamat: '',
      saveAddress: false
    });
    Swal.fire('Form dibatalkan!', '', 'info');
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      {savedAddresses.length > 0 && (
        <Box mb={2}>
          {savedAddresses.map((address, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{address.nama}</Typography>
                <Typography variant="body2" color="textSecondary">{address.alamat}</Typography>
                <Typography variant="body2" color="textSecondary">{address.phone}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nama"
            name="nama"
            variant="outlined"
            fullWidth
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan Nama"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan Email"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            name="tanggalLahir"
            variant="outlined"
            fullWidth
            value={formData.tanggalLahir}
            onChange={handleChange}
            placeholder="31/12/2021"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            placeholder="+62 Masukkan Nomor Telepon"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Alamat"
            name="alamat"
            variant="outlined"
            fullWidth
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Masukkan Alamat"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.saveAddress}
                onChange={handleChange}
                name="saveAddress"
              />
            }
            label="Simpan alamat ini untuk pengiriman berikutnya"
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
