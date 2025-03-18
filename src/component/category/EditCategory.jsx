// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';

const EditCategory = ({ open, onClose, category, refresh }) => {
    const [kategori, setKategori] = useState('');

    useEffect(() => {
        if (category) {
            setKategori(category.kategori || '');
        }
    }, [category]);

    const handleEdit = async () => {
        try {
            await axios.put(`http://localhost:4322/api/categories/${category.id}`, 
                null, 
                { params: { kategori: kategori } }
            );                        
            refresh();
            onClose();
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Category</DialogTitle>
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
                <Button onClick={handleEdit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EditCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    category: PropTypes.shape({
        id: PropTypes.number,
        kategori: PropTypes.string,
    }),
    refresh: PropTypes.func.isRequired,
};

export default EditCategory;
