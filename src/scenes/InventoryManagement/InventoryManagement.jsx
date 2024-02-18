import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        const response = await axios.get('http://localhost:4000/inventoryItems');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error.message);
      }
    };

    fetchData();
  }, []);

  // Filter items based on criteria
  const filteredItems = () => {
    if (filterCriteria === 'all') {
      return inventoryItems;
    } else if (filterCriteria === 'lowStock') {
      return inventoryItems.filter(item => parseInt(item.quantity, 10) < 10);
    } else if (filterCriteria === 'outOfStock') {
      return inventoryItems.filter(item => parseInt(item.quantity, 10) === 0);
    }

    // Add more filter conditions as needed
  };

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

        {/* Filter dropdown */}
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
        {/* Wrap TableContainer with Box and add boxShadow */}
        <Box boxShadow={3} p={3} borderRadius={8} bgcolor="background.paper" className="table-container">
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
                {filteredItems()
                  .filter((item) => item.item.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{item.item}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.location}</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleRemoveItem(index)}><RemoveIcon /></Button>
                        <Button onClick={() => openEditDialog(index)}><EditIcon /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
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
