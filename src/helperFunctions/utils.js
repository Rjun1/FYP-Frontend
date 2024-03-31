import bokChoy from "../imgs/bokChoy.png";
import choySum from "../imgs/choySum.jpg";
import kaiLan from "../imgs/kaiLan.jpg";
// import mizuna from "../imgs/mizuna.jpg";
// import basil from "../imgs/basil.jpg";
import mizuna from "../imgs/mizuna-microgreen.jpg";
import basil from "../imgs/basil-microgreen.jpg";

import {
    UilQuestionCircle,
    UilHeart,
    UilMedicalSquare,
    UilHeartBreak,
  } from "@iconscout/react-unicons";

export const sensors = ["Temperature", "Humidity", "Brightness", "pH", "CO2", "TDS", "EC"]
export const dataUnits = {
"Temperature": "(°C)", 
"Humidity": "(%)", 
"Brightness": "(μmol/m²/s)", 
"pH": "", 
"CO2": "(ppm)", 
"TDS": "(ppm)", 
"EC": "(mS/cm²)"}

export function formatDate(date) {
    const dateObj = new Date(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedPlanted = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    return formattedPlanted;
}

export function formatDateAndTime(date) {
    const dateObj = new Date(date);
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
      };
    
      const formattedDate = dateObj.toLocaleDateString('en-SG', options);
      return formattedDate;
    // const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // const formattedPlanted = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    // return formattedPlanted;
}

export function formatInputDateTime(selectedDate, selectedTime) {
    const selectedDateObj = new Date(selectedDate);
    const selectedTimeObj = new Date(selectedTime);
    const formattedDate = `${selectedDateObj.getFullYear()}-${(selectedDateObj.getMonth() + 1).toString().padStart(2, '0')}-${selectedDateObj.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${selectedTimeObj.getHours().toString().padStart(2, '0')}:${selectedTimeObj.getMinutes().toString().padStart(2, '0')}:${selectedTimeObj.getSeconds().toString().padStart(2, '0')}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
}

export function combineDateTime(selectedDate, selectedTime, originalTimestamp) {
    if (!selectedDate && selectedTime) {
        // Extract time from selectedDate and combine with selectedTime's date
        const date = originalTimestamp.split('T')[0];
        const selectedTimeObj = new Date(selectedTime);
        const newTime = `${selectedTimeObj.getHours().toString().padStart(2, '0')}:${selectedTimeObj.getMinutes().toString().padStart(2, '0')}:${selectedTimeObj.getSeconds().toString().padStart(2, '0')}`;
        console.log('date',date,'newTime',newTime);
        return `${date} ${newTime}`;
    } else if (selectedDate && !selectedTime) {
        // Extract date from selectedTime and combine with selectedDate's time
        const selectedDateObj = new Date(selectedDate);
        const newDate = `${selectedDateObj.getFullYear()}-${(selectedDateObj.getMonth() + 1).toString().padStart(2, '0')}-${selectedDateObj.getDate().toString().padStart(2, '0')}`;
        const time = new Date(originalTimestamp).toTimeString().split(' ')[0];
        console.log('newDate',newDate,'time',time);
        return `${newDate} ${time}`;
    } else {
        // Handle invalid cases or both selectedDate and selectedTime being present
        return null;
    }
}

export function getStyle(status) {
    const lowercaseStatus = status.toLowerCase();
    const styles = {
        'healthy': {
            'color': { color: '#559f89'},
            'backgroundColor': '#FFF',
            'icon': <UilHeart/>
        },
        'attention': {
            'color': { color: '#FFF'},
            'backgroundColor': '#ffc9b4',
            'icon': <UilMedicalSquare/>
        },
        'critical': {
            'color': { color: '#FFF'},
            'backgroundColor': '#ff6d71',
            'icon': <UilHeartBreak/>
        },
        'unknown': {
            'color': { color: '#CECECE'},
            'backgroundColor': 'linear-gradient(to bottom right, #83ceb7, #defff4)',
            'icon': <UilQuestionCircle/>
        },
    }
    return styles[lowercaseStatus];
}

export function getTopRowStyle(status) {
    const lowercaseStatus = status.toLowerCase();
    const styles = {
        'healthy': {
            'color': { color: '#065c4a'},
            'backgroundColor': 'linear-gradient(to bottom right, #83ceb7, #defff4)',
            'icon': <UilHeart/>
        },
        'attention': {
            'color': { color: '#ff747b'},
            'backgroundColor': 'linear-gradient(to bottom right, #ffc9b4, #faeae4)',
            'icon': <UilMedicalSquare/>
        },
        'critical': {
            'color': { color: '#FFF'},
            'backgroundColor': 'linear-gradient(to bottom right, #ff6d71, #f8bdbf)',
            'icon': <UilHeartBreak/>
        },
        'unknown': {
            'color': { color: '#CECECE'},
            'backgroundColor': 'linear-gradient(to bottom right, #83ceb7, #defff4)',
            'icon': <UilQuestionCircle/>
        },
    }
    return styles[lowercaseStatus];
}

function getStatusIndex(status) {
    switch (status) {
        case 'Healthy':
            return 0;
        case 'Attention':
            return 1;
        case 'Critical':
            return 2;
        default:
            return {};
    }
}
  
export function getPic(PlantName) {
    switch (PlantName) {
        case 'Bok Choy':
            return bokChoy;
        case 'Choy Sum':
            return choySum;
        case 'Kai Lan':
            return kaiLan;
        case 'Mizuna':
            return mizuna;
        case 'Basil':
            return basil;
        default:
            return {};
    }
}

const API_BASE_URL = 'https://eefypintegration.azurewebsites.net';

export const addPlantBatch = async (newPlantBatch) => {
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

