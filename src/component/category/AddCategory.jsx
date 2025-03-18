// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import { API_DUMMY } from '../../utils/api';

const AddCategory = ({ open, onClose, refresh }) => {
    const [kategori, setKategori] = useState('');

    const handleAdd = async () => {
        try {
            await axios.post(`${API_DUMMY}/api/categories, { kategori }`);
            refresh();
            onClose();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category"
                    fullWidth
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAdd} variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
};

export default AddCategory;
