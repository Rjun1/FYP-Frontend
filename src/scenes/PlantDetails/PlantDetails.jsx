import React, { useEffect, useState } from 'react';
import './PlantDetails.css';
import PlantDetailPage from './PlantDetailPage/PlantDetailPage';

const PlantDetails = () => {

  // Fetch data from local json file
  const [plantDetails, setPlantDetails] = useState([])
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0)

  
  const fetchData = () => {
    fetch('http://localhost:4000/PlantData')
        .then(res => res.json())
        .then(data => {setPlantDetails(data);})
        .catch(e => console.log(e.message));
  }

  useEffect(() => {
      fetchData();
  }, []);

  const handlePlantChange = (index) => {
    setSelectedPlantIndex(index);
  };

  const currentPlant = plantDetails[selectedPlantIndex];

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
  useEffect(() => {
    console.log("Logging backend", backend);
  }, [backend]);

  return (
    <div className='PlantDetails'>
      <div className='batch-tab'>
        {plantDetails.map((plant, index) => (
          <button 
            key={plant.id} 
            onClick={() => handlePlantChange(index)} 
            className= {selectedPlantIndex===index?'batch-button active': 'batch-button'}
            >
            {plant.title}
          </button>
        ))}
      </div>
      <div>
        {/* {backend.length !== 0 && backend.result && backend.result.PlantName} */}
      </div>
      {currentPlant && (<PlantDetailPage details={currentPlant}/>)}
    </div>
  );
};

export default PlantDetails;
