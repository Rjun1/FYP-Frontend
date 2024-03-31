import React, { useEffect, useState } from 'react'
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

import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

// Import helper functions
import { combineDateTime, formatDate, formatInputDateTime, getPic, getTopRowStyle } from '../../helperFunctions/utils';

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

const API_BASE_URL = 'https://eefypintegration.azurewebsites.net';

const addPlantBatch = async (newPlantBatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plant/growPlant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlantBatch),
    });

    if (!response.ok) {
      throw new Error('Failed to add new plant batch');
    }

    const responseData = await response.json();
    console.log('New Plant Batch added successfully:', responseData);
  } catch (error) {
    console.error('Error adding new plant batch:', error.message);
  }
};

const harvestPlantBatch = async (harvestData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plant/harvestPlant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(harvestData),
    });

    if (!response.ok) {
      throw new Error('Failed to harvest plant');
    }

    const responseData = await response.json();
    console.log('Plant harvested successfully:', responseData);
  } catch (error) {
    console.error('Error harvesting plant:', error.message);
  }
};

const editPlantBatch = async (editedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plant/editPlantBatchDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    if (!response.ok) {
      throw new Error('Failed to edit plant batch details');
    }

    const responseData = await response.json();
    console.log('Plant batch details edited successfully:', responseData);
  } catch (error) {
    console.error('Error editing plant batch details:', error.message);
  }
};

const editMicrocontrollerId = async (editedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/plant/updateMicrocontrollerForActivePlantBatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    if (!response.ok) {
      throw new Error('Failed to edit microcontroller Id');
    }

    const responseData = await response.json();
    console.log('Microcontroller Id edited successfully:', responseData);
  } catch (error) {
    console.error('Error editing microcontroller Id:', error.message);
  }
};

const deletePlantBatch = async (plantBatchId) => {
  try {
    const response = await fetch(`https://eefypintegration.azurewebsites.net/plant/deletePlantBatch/${plantBatchId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete plant batch');
    }

    console.log('Plant batch deleted successfully:', plantBatchId);
  } catch (error) {
    console.error('Error deleting plant batch:', error.message);
  }
};



function PlantDetailsTopRow({plantDetails, activePlantBatchId, activePlantNames, details}) {

  const [availPlantType, setAvailPlantTypes] = useState(['Basil', 'Mizuna', 'Choy Sum'])
  useEffect (() => {
    const newAvailPlantTypes = ['Basil', 'Mizuna', 'Choy Sum'].filter(plant => !activePlantNames.includes(plant));
    setAvailPlantTypes(newAvailPlantTypes)
  }, [activePlantNames]);
  const [openGrow, setOpenGrow] = useState(false);
  const [openHarvest, setOpenHarvest] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleClickOpenGrow = () => {
    setOpenGrow(true);
  };
  const handleCloseGrow = () => {
    setOpenGrow(false);
    reset();
  };
  const handleClickOpenHarvest = () => {
    setOpenHarvest(true);
  };
  const handleCloseHarvest = () => {
    setOpenHarvest(false);
    reset();
  };
  // const handleClickOpenEdit = () => {
  //   setOpenEdit(true);
  // };
  // const handleCloseEdit = () => {
  //   setOpenEdit(false);
  //   reset();
  // };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    reset();
  };

  const [plantName, setPlantName] = useState('');
  const [plantLocation, setPlantLocation] = useState('');
  const [microcontrollerId, setMicrocontrollerId] = useState('');
  const [quantityPlantedStr, setQuantityPlantedStr] = useState('');
  const [selectedDate, setDateChange] = useState(null);
  const [selectedTime, setTimeChange] = useState(null);

  const [weightHarvestedStr, setWeightHarvestedStr] = useState('');

  const [plantBatchIdStr, setPlantBatchIdStr] = useState('');

  // const [newPlantName, setNewPlantName] = useState('');

  const locationMicrontrollerPairs = {
    "Shelf A": "Set A", 
    "Shelf B": "Set B",
    "Shelf C": "Set C"
  }
  const plantNameIdPairs = {
    "Basil": "1", 
    "Mizuna": "2",
    "Choy Sum": "3"
  }

  const reset = () => {
    setPlantName('');
    setPlantLocation('');
    setMicrocontrollerId('');
    setQuantityPlantedStr('');
    setDateChange(null);
    setTimeChange(null);
    setWeightHarvestedStr('');
    setPlantBatchIdStr('');
    // setNewPlantName('');
  }

  const handlePlantNameChange = (event, newValue) => {
    setPlantName(newValue);
  };
  const handlePlantLocationChange = (event, newValue) => {
    setPlantLocation(newValue);
    setMicrocontrollerId(locationMicrontrollerPairs[newValue]);
  };
  const handleMicrocontrollerIdChange = (event, newValue) => {
    setMicrocontrollerId(newValue);
  };
  const handleQuantityPlantedStrChange = (event) => {
    setQuantityPlantedStr(event.target.value);
  };

  const handleWeightHarvestedStrChange = (event) => {
    setWeightHarvestedStr(event.target.value);
  };

  const handlePlantBatchIdStrChange = (event) => {
    setPlantBatchIdStr(event.target.value);
  };

  // const handleNewPlantNameChange = (event) => {
  //   setNewPlantName(event.target.value);
  // };
  

  const handleSubmitGrow = (event) => {
    event.preventDefault();
    const datePlanted = formatInputDateTime(selectedDate, selectedTime);
  
    const plantId = parseInt(plantNameIdPairs[plantName], 10);
    const quantityPlanted = parseInt(quantityPlantedStr, 10)

    const newPlantBatch = {
      plantId,
      plantLocation,
      microcontrollerId,
      quantityPlanted,
      datePlanted
    };
    console.log(newPlantBatch);
    addPlantBatch(newPlantBatch);

    // Reset 
    // setPlantName('')
    // setPlantLocation('')
    // setMicrocontrollerId('')
    // setQuantityPlantedStr('')
    // setDateChange(null)
    // setTimeChange(null)
    reset();
    handleCloseGrow();
  };

  const handleSubmitHarvest = (event) => {
    event.preventDefault();

    const dateHarvested = formatInputDateTime(selectedDate, selectedTime);

    const plantBatchId = activePlantBatchId[activePlantNames.indexOf(plantName)];
    const weightHarvested = parseInt(weightHarvestedStr, 10)

    const harvestData = {
      plantBatchId,
      weightHarvested,
      dateHarvested
    };
    console.log(harvestData);
    harvestPlantBatch(harvestData);

    // Reset 
    // setPlantName('')
    // setWeightHarvestedStr('')
    // setDateChange(null)
    // setTimeChange(null)
    reset();
    handleCloseHarvest();
  };

  // const handleSubmitEdit = (event) => {
  //   event.preventDefault();

  //   const plantIndex = activePlantNames.indexOf(plantName);
  //   const plantBatchId = activePlantBatchId[plantIndex];
  //   console.log('plantBatchId',plantBatchId)
    
  //   var plantId = parseInt(plantNameIdPairs[plantName], 10);
  //   console.log('plantId',plantId)
  //   if (newPlantName) {
  //     plantId = parseInt(plantNameIdPairs[newPlantName], 10);
  //     console.log(' -- new plantId',plantId)
  //   }

  //   var datePlanted = plantDetails[plantIndex].DatePlanted;
  //   // const dateObject = new Date(timestamp);
  //   console.log('datePlanted',datePlanted)
  //   console.log('selectedDate',selectedDate)
  //   console.log('selectedTime',selectedTime)
  //   if (selectedDate & !selectedTime) {
  //     // const formattedTime = `${selectedTimeObj.getHours().toString().padStart(2, '0')}:${selectedTimeObj.getMinutes().toString().padStart(2, '0')}:${selectedTimeObj.getSeconds().toString().padStart(2, '0')}`;
  //     // const timeString = dateObject.toTimeString().split(' ')[0];
  //     // const formattedDateTime = `${formattedDate} ${selectedTime}`;
  //     // console.log(' -- new datePlanted',datePlanted)
  //   }

  //   var quantityPlanted = plantDetails[plantIndex].QuantityPlanted;
  //   console.log('quantityPlanted',quantityPlanted)
  //   if (quantityPlantedStr) {
  //     quantityPlanted = parseInt(quantityPlantedStr, 10)
  //     console.log( " -- new quantityPlanted", quantityPlanted)
  //   }
    


  //   // const datePlanted = formatInputDateTime(selectedDate, selectedTime);

  //   var location = '';
  //   console.log('PlantLocation',location)
  //   if (plantLocation) {
  //     console.log(' -- new PlantLocation',plantLocation)
  //     location = plantLocation;
  //   }

  //   const editedPlantBatchData = {
  //     plantBatchId,
  //     plantId,
  //     datePlanted,
  //     quantityPlanted,
  //     location,
  //   };
  //   console.log('editedPlantBatchData', editedPlantBatchData);
  //   // editPlantBatch(editedData);

  //   if (microcontrollerId) {
  //     const currentMicrocontrollerId = 'Testing only'
  //     const currentInactiveMicrocontrollerId = microcontrollerId; // New microntrollerId
  //     const editedMicrocontrollerIdData = {
  //       currentMicrocontrollerId,
  //       currentInactiveMicrocontrollerId
  //     }
  //     console.log('editedMicrocontrollerIdData',editedMicrocontrollerIdData);
  //     // editMicrocontrollerId(editedMicrocontrollerIdData)
  //   } 

  //   reset();
  //   handleCloseEdit();
  // };

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    
    const plantBatchId = activePlantBatchId[activePlantNames.indexOf(plantName)];

    console.log(plantBatchId);
    deletePlantBatch(plantBatchId);

    // Reset 
    setPlantBatchIdStr('')
    handleCloseDelete();
  };
  

  return (
    <div className='PlantDetailsTopRow' 
      style={{
        background: getTopRowStyle(details.status).backgroundColor,
        background: getTopRowStyle(details.status).backgroundColor,
      }}>
      <div className='details-column'>
        <div>
          <span className='flex-col'> 
          <span className='flex-col'> 
            <div className='title'>
              {details.PlantName}
              {details.PlantName}
            </div>
            <div className='status-container' style={getTopRowStyle(details.status).color}>
              {getTopRowStyle(details.status).icon}
              <span>{details.status && (details.status.charAt(0).toUpperCase() + details.status.slice(1))}</span>
            </div>
          </span>
          <div>
            <img src={getPic(details.PlantName)} alt="Plant Image" className="circular-image"/>
            <img src={getPic(details.PlantName)} alt="Plant Image" className="circular-image"/>
          </div>
        </div>
        <div className='info flex-col'>
          <span><span>Date planted:</span> {formatDate(details.DatePlanted)}</span>
        </div>
      </div>

      <CountdownComponent plantDate={details.DatePlanted} expectedHarvestDate={details.ExpectedHarvestDate}/>
      <CountdownComponent plantDate={details.DatePlanted} expectedHarvestDate={details.ExpectedHarvestDate}/>

      <div className='buttons-column'>
        <div>
          <ColorButton variant="contained" onClick={handleClickOpenGrow} style={{width:'100%', height:'100%'}}>Grow</ColorButton>
          <Dialog
            open={openGrow}
            onClose={handleCloseGrow}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmitGrow,
            }}
          >
            <DialogTitle>Grow a new batch</DialogTitle>
            <DialogContent>
              <div>
                <Autocomplete
                  freeSolo
                  options={availPlantType}
                  value={plantName}
                  onChange={handlePlantNameChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Plant Name" variant="outlined" required={true} />
                  )}
                  className='inputBox'
                />
                <Autocomplete
                  freeSolo
                  options={['Shelf A', 'Shelf B', 'Shelf C']}
                  value={plantLocation}
                  onChange={handlePlantLocationChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Plant Location" variant="outlined" required={true}/>
                  )}
                  className='inputBox'
                />
                <Autocomplete
                  freeSolo
                  options={['Set A', 'Set B', 'Set C']}
                  value={microcontrollerId}
                  onChange={handleMicrocontrollerIdChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Microcontroller ID" variant="outlined" required={true}/>
                  )}
                  className='inputBox'
                />
                <TextField
                  required
                  id="quantity-planted"
                  label="Quantity planted"
                  type="number"
                  value={quantityPlantedStr}
                  onChange={handleQuantityPlantedStrChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className='inputBox'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Date planted"
                      value={selectedDate}
                      onChange={(newValue) => setDateChange(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </DemoContainer>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      label="Time Planted"
                      value={selectedTime}
                      onChange={(newValue) => setTimeChange(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseGrow}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <ColorButton variant="contained" onClick={handleClickOpenHarvest} style={{width:'100%', height:'100%'}}>Harvest</ColorButton>
          <Dialog
            open={openHarvest}
            onClose={handleCloseHarvest}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmitHarvest,
            }}
          >
            <DialogTitle>Harvest a batch</DialogTitle>
            <DialogContent>
              <div>
                <Autocomplete
                  freeSolo
                  options={activePlantNames}
                  value={plantName}
                  onChange={handlePlantNameChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Plant Name" variant="outlined" required={true} />
                  )}
                  className='inputBox'
                />
                <TextField
                  required
                  id="weight-harvested"
                  label="Weight harvested"
                  type="number"
                  value={weightHarvestedStr}
                  onChange={handleWeightHarvestedStrChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className='inputBox'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Date harvested"
                      value={selectedDate}
                      onChange={(newValue) => setDateChange(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </DemoContainer>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      label="Time harvested"
                      value={selectedTime}
                      onChange={(newValue) => setTimeChange(newValue)}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseHarvest}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* <div>
          <ColorButton variant="contained" onClick={handleClickOpenEdit} style={{width:'100%', height:'100%'}}>Edit</ColorButton>
          <Dialog
            open={openEdit}
            onClose={handleCloseEdit}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmitEdit,
            }}
          >
            <DialogTitle>Edit a batch</DialogTitle>
            <DialogContentText style={{width:'310px', padding:'0px 24px'}}>
              Choose the plant name of the batch that needs to be modified. 
            </DialogContentText>
            <DialogContentText style={{width:'310px', padding:'0px 24px'}}>
            <span style={{fontWeight:'bold'}}>ONLY</span> fill in the fields that need to be edited.
            </DialogContentText>
            <DialogContent>
              <div>
                <Autocomplete
                  freeSolo
                  options={['Basil', 'Mizuna', 'Choy Sum']}
                  value={plantName}
                  onChange={handlePlantNameChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Plant to be edited" variant="outlined" required={true} />
                  )}
                  className='inputBox'
                />
                <Autocomplete
                  freeSolo
                  options={['Basil', 'Mizuna', 'Choy Sum']}
                  value={newPlantName}
                  onChange={handleNewPlantNameChange}
                  renderInput={(params) => (
                    <TextField {...params} label="NEW plant type" variant="outlined"/>
                  )}
                  className='inputBox'
                />
                <Autocomplete
                  freeSolo
                  options={['Shelf A', 'Shelf B', 'Shelf C']}
                  value={plantLocation}
                  onChange={handlePlantLocationChange}
                  renderInput={(params) => (
                    <TextField {...params} label="NEW plant Location" variant="outlined"/>
                  )}
                  className='inputBox'
                />
                <Autocomplete
                  freeSolo
                  options={['Set A', 'Set B', 'Set C']}
                  value={microcontrollerId}
                  onChange={handleMicrocontrollerIdChange}
                  renderInput={(params) => (
                    <TextField {...params} label="NEW microcontroller ID" variant="outlined"/>
                  )}
                  className='inputBox'
                />
                <TextField
                  id="quantity-planted"
                  label="NEW quantity planted"
                  type="number"
                  value={quantityPlantedStr}
                  onChange={handleQuantityPlantedStrChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className='inputBox'
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="NEW date planted"
                      value={selectedDate}
                      onChange={(newValue) => setDateChange(newValue)}
                    />
                  </DemoContainer>
                  <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                      label="NEW time Planted"
                      value={selectedTime}
                      onChange={(newValue) => setTimeChange(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div> */}
        <div>
          <ColorButton variant="contained" onClick={handleClickOpenDelete} style={{width:'100%', height:'100%'}}>Delete</ColorButton>
          <Dialog
            open={openDelete}
            onClose={handleCloseDelete}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmitDelete,
            }}
          >
            <DialogTitle>Delete a batch</DialogTitle>
            <DialogContent>
              <div>
                <Autocomplete
                  freeSolo
                  options={activePlantNames}
                  value={plantName}
                  onChange={handlePlantNameChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Plant Name" variant="outlined" required={true} />
                  )}
                  className='inputBox'
                />
                {/* <TextField
                  required
                  id="plant-batch-id"
                  label="Plant Batch Id"
                  type="number"
                  value={plantBatchIdStr}
                  onChange={handlePlantBatchIdStrChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className='inputBox'
                /> */}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      
      

      
      

    </div>
  )
}

export default PlantDetailsTopRow