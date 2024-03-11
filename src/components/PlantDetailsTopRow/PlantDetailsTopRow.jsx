import React, { useState } from 'react'
import './PlantDetailsTopRow.css';

import CountdownComponent from '../CountdownComponent/CountdownComponent';

// Import Ant Design components
import { ClockCircleOutlined } from '@ant-design/icons'
import { Timeline } from 'antd'

// Import MUI components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

// Import helper functions
import { formatDate, getPic, getTopRowStyle } from '../../helperFunctions/utils';

const ColorButton = styled(Button)(() => ({
  color: '#3e8873',
  backgroundColor: '#f2fffb',
  '&:hover': {
    color: '#f2fffb',
    backgroundColor: '#3e8873',
  },

  // textTransform: 'capitalize',
  fontFamily: 'Poppins',
}));

function PlantDetailsTopRow({details}) {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // This will contain all form fields
    handleClose();
  };

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='PlantDetailsTopRow' 
      style={{
        background: getTopRowStyle(details.status).backgroundColor,
      }}>
      <div className='details-column'>
        <div>
          <span className='flex-col'> 
            <div className='title'>
              {details.PlantName}
            </div>
            <div className='status-container' style={getTopRowStyle(details.status).color}>
              {getTopRowStyle(details.status).icon}
              <span >{details.status}</span>
            </div>
          </span>
          <div>
            <img src={getPic(details.PlantName)} alt="Plant Image" className="circular-image"/>
          </div>
        </div>
        <div className='info flex-col'>
          <span><span>Date planted:</span> {formatDate(details.DatePlanted)}</span>
          {/* <span><span>Last watered:</span> {details.lastWatered}</span> */}
        </div>
      </div>

      <CountdownComponent plantDate={details.DatePlanted} expectedHarvestDate={details.ExpectedHarvestDate}/>

      <div className='buttons-column'>
        <ColorButton variant="contained" onClick={handleClickOpen}>Grow</ColorButton>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle>Grow a new batch</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the new batch of plant.
            </DialogContentText>
            {/* <Box sx={{ minWidth: 120 }}> */}
              {/* <FormControl fullWidth>
                <InputLabel id="plant-name-select-label">Plant faefage</InputLabel> */}
                <Select
                  // labelId="plant-name-select-label"
                  id="plant-name-select"
                  value={selectedName}
                  label="Name"
                  onChange={handleNameChange}
                  fullWidth
                >
                  <MenuItem value="Choy Sum">Choy Sum</MenuItem>
                  <MenuItem value="Mizuna">Mizuna</MenuItem>
                  <MenuItem value="Basil">Basil</MenuItem>
                </Select>
              {/* </FormControl> */}
            {/* </Box> */}
            
            <TextField
              autoFocus
              required
              margin="dense"
              id="plantName"
              name="Plant Name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
        <ColorButton variant="contained">Harvest</ColorButton>
        <ColorButton variant="contained">Edit</ColorButton>
        <ColorButton variant="contained">Delete</ColorButton>
      </div>
      
      

    </div>
  )
}

export default PlantDetailsTopRow