import React, { useState, useEffect } from 'react'
import "./DetailsCards.css"
import DetailsCard from '../DetailsCard/DetailsCard'

const dataUnits = {
  "Temperature": "(°C)", 
  "Humidity": "(%)", 
  "Brightness": "(μmol/m²/s)", 
  "pH": "", 
  "CO2": "(ppm)", 
  "TDS": "(ppm)", 
  "EC": "(mS/cm²)"}

function DetailsCards({sensorData}) {

  const sensors = ["Temperature", "Humidity", "Brightness", "pH", "CO2", "TDS", "EC"]
  
  // console.log("sensorData [detailsCard]:", sensorData)
  
  return (
    <div className='DetailsCards'>
        {sensorData != {} && Object.keys(sensorData).length > 0 && sensors.map(sensorName => (
        <DetailsCard
          key={sensorName}
          title={sensorName}
          unit={dataUnits[sensorName]}
          min={sensorData[sensorName + "_min"]}
          max={sensorData[sensorName + "_max"]}
          actual={sensorData[sensorName]}
          optimal={sensorData[sensorName + "_optimal"]}
          datetime={sensorData.Datetime}
        />
        ))} 
    </div>
    
  )
}

export default DetailsCards