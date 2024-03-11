import React, { useEffect, useState } from 'react';
import './PlantDetails.css';
import PlantDetailPage from './PlantDetailPage/PlantDetailPage';

// Import MUI components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

  // Fetch data from local json file
  const [plantDetails, setPlantDetails] = useState([])
  const [sensorData, setSensorData] = useState({})
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0)
  const [selectedSensorData, setSelectedSensorData] = useState({})
  
  const fetchData = () => {
    // Fetch plant batch info
    fetch('http://localhost:4000/PlantData')
        .then(res => res.json())
        .then(data => {setPlantDetails(data);})
        .catch(e => console.log(e.message));
    // Fetch historical plant sensor data
    fetch('http://localhost:4001/result')
        .then(res => res.json())
        .then(data => {setSensorData(data);})
        .catch(e => console.log(e.message));
  }
  useEffect(() => {
      fetchData();
  }, []);
  useEffect(() => {
    console.log('new plantDetails',plantDetails)
  }, [plantDetails]);
  useEffect(() => {
    console.log('new sensorData',sensorData)
  }, [sensorData]);
  

  

  const currentPlant = plantDetails[selectedPlantIndex];
  const handlePlantChange = (index) => {
    setSelectedPlantIndex(index);
  };
  
  const getSelectedSensorData = (currentPlant) => {
    console.log('plantDetails.length', plantDetails.length)
    if (plantDetails.length != 0) {
      var selectedPlantName = currentPlant.PlantName;
      setSelectedSensorData(sensorData[selectedPlantName]);
      console.log(selectedPlantName, '--',sensorData[selectedPlantName])
    } 
  }
  useEffect(() => {
    getSelectedSensorData(currentPlant);
  }, [sensorData, selectedPlantIndex]);

  // Fetch data from cloud
  const url = 'https://eefypintegration.azurewebsites.net/plant/plantData'

  const [backend, setBackend] = useState([])
  const fetchBackendData = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => {setBackend(data);})
        .catch(e => console.log(e.message));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        fetchBackendData();
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
  // useEffect(() => {
  //   console.log("Logging backend", backend);
  // }, [backend]);

  return (
    <div className='PlantDetails'>
      <div className='batch-tab'>
        {plantDetails.map((plant, index) => (
          <button 
            key={plant.PlantBatchId} 
            onClick={() => handlePlantChange(index)} 
            className= {selectedPlantIndex===index?'batch-button active': 'batch-button'}
            >
            {plant.PlantName}
          </button>
        ))}
        {plantDetails.length === 0 && 
          (<div>No Plants Planted</div>)}
      </div>
      <div>
        {/* {backend.length !== 0 && backend.result && backend.result.PlantName} */}
      </div>
      {currentPlant && selectedSensorData && Object.keys(currentPlant).length !== 0 && Object.keys(selectedSensorData).length !== 0 && (
        <PlantDetailPage details={currentPlant} sensorData={selectedSensorData}/>)}
      {plantDetails.length === 0 && 
        (<ColorButton variant="contained">Grow a new batch</ColorButton>)}
    </div>
  );
};

export default PlantDetails;
