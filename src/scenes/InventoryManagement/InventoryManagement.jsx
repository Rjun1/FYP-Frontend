import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editAction, setEditAction] = useState('add'); // 'add' or 'remove'
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/inventoryItems');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:4000/inventoryItems', newItem);
      setInventoryItems([...inventoryItems, response.data]);
      setNewItem({ item: '', quantity: '', location: '' });
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...inventoryItems];
    updatedItems.splice(index, 1);
    setInventoryItems(updatedItems);
  };

  const handleEditQuantity = () => {
    const updatedItems = [...inventoryItems];
    const currentQuantity = parseInt(updatedItems[selectedItemIndex].quantity, 10);
    const quantityChange = parseInt(editQuantity, 10);

    updatedItems[selectedItemIndex].quantity =
      editAction === 'add' ? currentQuantity + quantityChange : currentQuantity - quantityChange;

    setInventoryItems(updatedItems);
    setIsEditDialogOpen(false);
    setSelectedItemIndex(null);
    setEditQuantity('');
    setEditAction('add'); // Reset to 'add' for next edit
  };

  const openEditDialog = (index) => {
    setSelectedItemIndex(index);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="inventory-container">
      <div className="search-container">
        <TextField
          label="Search Item"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="form-container">
        <TextField
          label="Item"
          variant="outlined"
          value={newItem.item}
          onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
        />
        <TextField
          label="Quantity"
          variant="outlined"
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <TextField
          label="Location"
          variant="outlined"
          value={newItem.location}
          onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>

      <div className="table-scroll-container">
        <TableContainer component={Paper} className="table-container">
          <Table aria-label="inventory table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems
                .filter((item) => item.item.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{item.item}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.location}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleRemoveItem(index)}>Remove</Button>
                      <Button onClick={() => openEditDialog(index)}>Edit Quantity</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Edit Quantity Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Quantity</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
          />
          <RadioGroup
            aria-label="edit-action"
            name="edit-action"
            value={editAction}
            onChange={(e) => setEditAction(e.target.value)}
            row
          >
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel value="remove" control={<Radio />} label="Remove" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditQuantity} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
