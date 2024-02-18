import React, { useState } from 'react';

const CropManagementWidget = () => {
  const [selectedVegetable, setSelectedVegetable] = useState('');
  
  // Static crop management tips for each vegetable
  const cropManagementTips = {
    'Bok Choy': {
      title: 'Bok Choy Management Tips',
      description: 'Bok choy grows best in well-drained, fertile soil with plenty of organic matter. It requires consistent watering and partial shade in hot climates. Watch out for pests like aphids and cabbage worms.'
    },
    'Choy Sum': {
      title: 'Choy Sum Management Tips',
      description: 'Choy sum thrives in cooler temperatures and prefers well-drained soil. Maintain a consistent watering schedule and watch out for pests like cabbage worms and aphids.'
    },
    'Kai Lan': {
      title: 'Kai Lan Management Tips',
      description: 'Kai lan, also known as Chinese broccoli, prefers cooler temperatures and well-drained soil. Ensure proper spacing between plants, and monitor for pests like flea beetles and cabbage loopers.'
    }
    // Add more vegetables and their management tips as needed
  };

  // Function to handle button click
  const handleButtonClick = (vegetable) => {
    setSelectedVegetable(vegetable);
  };

  return (
    <div className="crop-management-widget">
      <h3>Crop Management Tips</h3>
      <div>
        <button onClick={() => handleButtonClick('Bok Choy')}>Bok Choy</button>
        <button onClick={() => handleButtonClick('Choy Sum')}>Choy Sum</button>
        <button onClick={() => handleButtonClick('Kai Lan')}>Kai Lan</button>
        {/* Add more buttons for other vegetables as needed */}
      </div>
      {selectedVegetable && (
        <div>
          <h4>{cropManagementTips[selectedVegetable].title}</h4>
          <p>{cropManagementTips[selectedVegetable].description}</p>
          {/* Render additional information as needed */}
        </div>
      )}
    </div>
  );
};

export default CropManagementWidget;
