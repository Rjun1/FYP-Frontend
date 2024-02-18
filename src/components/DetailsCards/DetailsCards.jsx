import React, { useState, useEffect } from 'react'
import "./DetailsCards.css"
import DetailsCard from '../DetailsCard/DetailsCard'

const historicalDataTitles = ["historicalTemperature", "historicalHumidity", "historicalLight", "historicalPH", "historicalCo2", "historicalTds", "historicalEC"]
const cardTitles = ["Temperature", "Humidity", "Light Intensity", "PH", "Co2", "Tds", "EC"]

const dataUnits = ["(°C)", "(%)", "(μmol/m²/s)", "", "(ppm)", "(ppm)", "(mS/cm²)"]

function DetailsCards({details}) {


  ////////////////////
  // Fetch data from local json file
  const [plantDetails, setPlantDetails] = useState([])
  
  const fetchData = () => {
    fetch('http://localhost:4001/result')
        .then(res => res.json())
        .then(data => {setPlantDetails(data);})
        .catch(e => console.log(e.message));
  }

  useEffect(() => {
      fetchData();
  }, []);
  ////////////////////

  return (
    <div className='DetailsCards'>
        {historicalDataTitles.map((dataTitle, index) => (
        <DetailsCard key={dataTitle} title={cardTitles[index]} unit={dataUnits[index]} dataset={details[dataTitle]} backend={plantDetails}/>
        ))}
    </div>
    
  )
}

export default DetailsCards