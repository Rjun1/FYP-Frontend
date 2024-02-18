import React, { useState } from 'react';
import { Card } from 'antd';
import './PlantDetails.css';

const plantData = {
  plant1: {
    name: 'Monstera Deliciosa',
    status: 'Healthy',
    birthdate: 'June 30, 2020',
    lastWatered: '5 min ago',
    timeUntilNextWatering: '47:58:29',
    harvestReady: false,
    timeline: [
      { event: 'Create a services site', date: '2015-09-01' },
      { event: 'Solve initial network problems', date: '2015-09-01' },
      { event: 'Technical testing', date: '2015-09-01' },
      { event: 'Network problems being solved', date: '2015-09-01' },
    ],
    quantityHarvested: null,
  },
  plant2: {
    name: 'Snake Plant',
    status: 'Thriving',
    birthdate: 'August 15, 2021',
    lastWatered: '2 hours ago',
    timeUntilNextWatering: '23:00:00',
    harvestReady: true,
    timeline: [
      { event: 'Planting in a new pot', date: '2021-08-15' },
      { event: 'First watering', date: '2021-08-16' },
      { event: 'Adopted a new leaf', date: '2021-09-01' },
    ],
    quantityHarvested: 10,
  },
  plant3: {
    name: 'Fiddle Leaf Fig',
    status: 'Needs attention',
    birthdate: 'March 10, 2022',
    lastWatered: '1 day ago',
    timeUntilNextWatering: '20:00:00',
    harvestReady: false,
    timeline: [
      { event: 'Transplanting to a larger pot', date: '2022-03-10' },
      { event: 'Pruned some leaves', date: '2022-03-25' },
      { event: 'Changed soil', date: '2022-04-10' },
    ],
    quantityHarvested: null,
  },
};

const PlantDetails = () => {
  const [selectedPlant, setSelectedPlant] = useState('plant1');

  const handlePlantButtonClick = (plantKey) => {
    setSelectedPlant(plantKey);
  };

  const currentPlant = plantData[selectedPlant];

  return (
    <div className="plant-details-container">
      {/* Top Bar for navigation */}
      <div className="top-bar">
        <button className="nav-button" onClick={() => handlePlantButtonClick('plant1')}>
          Plant 1
        </button>
        <button className="nav-button" onClick={() => handlePlantButtonClick('plant2')}>
          Plant 2
        </button>
        <button className="nav-button" onClick={() => handlePlantButtonClick('plant3')}>
          Plant 3
        </button>
      </div>

      {/* Plant Details Card */}
      <Card className="plant-details-card" title="Plant Details" bordered={false}>
        <h1 className="plant-name">{currentPlant.name}</h1>
        <p>Status: {currentPlant.status}</p>
        <p>Birthdate: {currentPlant.birthdate}</p>
        <p>Last watered: {currentPlant.lastWatered}</p>
        <p>Time until next watering: {currentPlant.timeUntilNextWatering}</p>
        {currentPlant.harvestReady && <p>Ready for harvest!</p>}
        <h2>Timeline</h2>
        <ul>
          {currentPlant.timeline.map((event, index) => (
            <li key={index}>
              {event.event} - {event.date}
            </li>
          ))}
        </ul>
        {currentPlant.quantityHarvested !== null && (
          <p>Quantity harvested: {currentPlant.quantityHarvested}</p>
        )}
      </Card>
    </div>
  );
};

export default PlantDetails;
