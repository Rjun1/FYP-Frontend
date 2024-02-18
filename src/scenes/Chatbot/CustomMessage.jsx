import React from 'react';

const CustomMessage = ({ message }) => {
  const renderCropManagementTip = (cropName) => {
    // You can implement logic here to provide specific crop management tips
    switch (cropName.toLowerCase()) {
      case 'bok choy':
        return "Here are some tips for managing your bok choy: Ensure consistent watering, provide partial shade in hot climates, and watch out for pests like aphids.";

      case 'choy sum':
        return "For choy sum, maintain a consistent watering schedule and provide well-draining soil. Watch out for pests like cabbage worms and aphids.";

      case 'kai lan':
        return "Kai lan prefers cooler temperatures and well-draining soil. Ensure proper spacing between plants, and monitor for pests like flea beetles and cabbage loopers.";

      default:
        return "I'm sorry, I don't have specific management tips for that crop. Please specify a different crop.";
    }
  };

  return (
    <div className="custom-message">
      <p>{renderCropManagementTip(message)}</p>
    </div>
  );
};

export default CustomMessage;
