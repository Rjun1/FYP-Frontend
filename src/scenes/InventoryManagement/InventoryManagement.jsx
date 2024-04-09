import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', quantity: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editAction, setEditAction] = useState('add'); // 'add' or 'remove'
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState('all'); // Default filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eefypintegration.azurewebsites.net/inventory/retrieveAllInventoryData');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory items');
        }
        const data = await response.json();
        setInventoryItems(data.result);
      } catch (error) {
        console.error('Error fetching inventory items:', error.message);
      }
    };
    fetchData();
  }, [inventoryItems]);

  const handleAddItem = async () => {
    try {
      console.log('Adding item:', newItem);

      const response = await fetch('https://eefypintegration.azurewebsites.net/inventory/insertNewInventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: newItem.item,
          quantity: newItem.quantity,
          location: newItem.location,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      setInventoryItems(prevItems => [...prevItems, responseData]);

      setNewItem({ item: '', quantity: '', location: '' });
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`https://eefypintegration.azurewebsites.net/inventory/deleteInventory/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
  
      console.log('Item deleted successfully:', id);
  
      setInventoryItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };

  const handleEditQuantity = async () => {
    try {
      const updatedQuantity = parseInt(editQuantity, 10);
      if (isNaN(updatedQuantity)) {
        throw new Error('Invalid quantity');
      }
  
      const requestBody = {
        id: inventoryItems[selectedItemIndex].id,
        quantityChange: editAction === 'add' ? updatedQuantity : -updatedQuantity,
      };
  
      console.log('Request Body:', requestBody);
  
      const response = await fetch('https://eefypintegration.azurewebsites.net/inventory/updateInventoryQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
  
      const responseData = await response.json();
      console.log('Response:', responseData);
  
      const updatedItems = [...inventoryItems];
      updatedItems[selectedItemIndex].quantity = editAction === 'add' ?
        updatedItems[selectedItemIndex].quantity + updatedQuantity :
        updatedItems[selectedItemIndex].quantity - updatedQuantity;
  
      setInventoryItems(updatedItems);
      setIsEditDialogOpen(false);
      setSelectedItemIndex(null);
      setEditQuantity('');
      setEditAction('add');
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const openEditDialog = (index) => {
    setSelectedItemIndex(index);
    setIsEditDialogOpen(true);
  };

  const filteredItems = () => {
    let filtered = inventoryItems;
    if (filterCriteria === 'lowStock') {
      filtered = filtered.filter(item => parseInt(item.quantity, 10) > 0 && parseInt(item.quantity, 10) < 10);

    } else if (filterCriteria === 'outOfStock') {
      filtered = filtered.filter(item => parseInt(item.quantity, 10) === 0);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item => item.item.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return filtered;
  };

  return (
    <div className="inventory-container">
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

        <TextField
          label="Search Item"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        >
          <option value="all">All Items</option>
          <option value="lowStock">Low Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      <div className="table-scroll-container">
        <Box bgcolor="background.paper" className="table-container">
          <TableContainer component={Paper}>
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
                {filteredItems().map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{item.item}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.location}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleRemoveItem(item.id)}><RemoveIcon /></Button>
                      <Button onClick={() => openEditDialog(index)}><EditIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Quantity</DialogTitle>
        <DialogContent>
          {/* Edit quantity dialog content */}
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
          {/* Edit quantity dialog actions */}
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditQuantity} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
