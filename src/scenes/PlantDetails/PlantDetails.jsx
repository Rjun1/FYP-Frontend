import React, { useEffect, useState } from 'react';
import './PlantDetails.css';
import PlantDetailPage from './PlantDetailPage/PlantDetailPage';
import { addPlantBatch, formatInputDateTime } from '../../helperFunctions/utils';

// Import MUI components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const ColorButton = styled(Button)(() => ({
  color: '#3e8873',
  backgroundColor: '#BDC9C6',
  '&:hover': {
    color: '#f2fffb',
    backgroundColor: '#3e8873',
  },

  width: '100%',
  height: '200px',
  fontSize: '30px',

  // textTransform: 'capitalize',
  fontFamily: 'Poppins',
}));


const PlantDetails = () => {

  // Fetch data from cloud
  const urlActivePlantBatchSensorData = 'https://eefypintegration.azurewebsites.net/plant/retrieveActivePlantBatchSensorData'
  const urlActiveBatchInfoAndYield = 'https://eefypintegration.azurewebsites.net/plant/activePlantBatchInfoAndYield'

  const [plantDetails, setPlantDetails] = useState([])
  const [sensorData, setSensorData] = useState({})

  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0)
  const [selectedSensorData, setSelectedSensorData] = useState({})
  const [currentPlant, setCurrentPlant] = useState({})
  const [activePlantBatchId, setActivePlantBatchId] = useState([])
  const [activePlantNames, setActivePlantNames] = useState([])
  const [availPlantType, setAvailPlantTypes] = useState(['Basil', 'Mizuna', 'Choy Sum'])
  useEffect (() => {
    const newAvailPlantTypes = ['Basil', 'Mizuna', 'Choy Sum'].filter(plant => !activePlantNames.includes(plant));
    setAvailPlantTypes(newAvailPlantTypes)
  }, [activePlantNames]);

  const fetchBackendData = () => {
    fetch(urlActiveBatchInfoAndYield)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setPlantDetails(data["result"]);
        })
        .catch(error => {
            console.error('Error fetching active batch info and yield:', error);
        });

    fetch(urlActivePlantBatchSensorData)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setSensorData(data["result"]);
        })
        .catch(error => {
            console.error('Error fetching active plant batch sensor data:', error);
        });
}

  useEffect(() => {
    fetchBackendData();
    const intervalId = setInterval(() => {
        fetchBackendData();
    }, 2000); // 1000 milliseconds = 1 second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
  

  const handlePlantChange = (index) => {
    setSelectedPlantIndex(index);
  };
  
  const getSelectedSensorData = (currentPlant) => {
    if (plantDetails.length != 0 && currentPlant) {
      var selectedPlantName = currentPlant.PlantName;
      setSelectedSensorData(sensorData[selectedPlantName]);
    } 
  }

  useEffect(() => {
    setActivePlantBatchId(plantDetails.map(plant => plant.PlantBatchId));
    setActivePlantNames(plantDetails.map(plant => plant.PlantName));
    getSelectedSensorData(currentPlant);
  }, [currentPlant]);

  useEffect(() => {
    setCurrentPlant(plantDetails[selectedPlantIndex]);
    setActivePlantBatchId(plantDetails.map(plant => plant.PlantBatchId));
    setActivePlantNames(plantDetails.map(plant => plant.PlantName));
    getSelectedSensorData(currentPlant);
  }, [sensorData, selectedPlantIndex]);

  // Grow button to add a new batch
  const [openGrow, setOpenGrow] = useState(false);
  const handleClickOpenGrow = () => {
    setOpenGrow(true);
  };
  const handleCloseGrow = () => {
    setOpenGrow(false);
    setPlantName('')
    setPlantLocation('')
    setMicrocontrollerId('')
    setQuantityPlantedStr('')
    setDateChange(null)
    setTimeChange(null)
  };

  const [plantName, setPlantName] = useState('');
  const [plantLocation, setPlantLocation] = useState('');
  const [microcontrollerId, setMicrocontrollerId] = useState('');
  const [quantityPlantedStr, setQuantityPlantedStr] = useState('');
  const [selectedDate, setDateChange] = useState(null);
  const [selectedTime, setTimeChange] = useState(null);

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
    setPlantName('')
    setPlantLocation('')
    setMicrocontrollerId('')
    setQuantityPlantedStr('')
    setDateChange(null)
    setTimeChange(null)
    handleCloseGrow();
  };

  return (
    <div className='PlantDetails'>
      <div className='batch-tab'>
        {plantDetails.length !== 0 && 
          (plantDetails.map((plant, index) => {
              return (
              <button 
                key={plant.PlantBatchId} 
                onClick={() => handlePlantChange(index)} 
                className= {selectedPlantIndex===index?'batch-button active': 'batch-button'}
                >
                {plant.PlantName}
              </button>
            )
            }))}
        {plantDetails.length === 0 && 
          (<div>No Plants Planted</div>)}
      </div>
      {currentPlant && Object.keys(currentPlant).length !== 0 && (
        <PlantDetailPage plantDetails={plantDetails} activePlantBatchId={activePlantBatchId} activePlantNames={activePlantNames} details={currentPlant} sensorData={selectedSensorData}/>)}
      {plantDetails.length === 0 && 
        (<div> 
          <ColorButton variant="contained" onClick={handleClickOpenGrow}>Grow a new batch</ColorButton>
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
        )}
    </div>
  );
};

export default PlantDetails;
