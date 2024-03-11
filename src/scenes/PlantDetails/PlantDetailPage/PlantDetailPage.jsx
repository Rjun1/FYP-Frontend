import React from 'react'
import './PlantDetailPage.css';
import DetailsCards from '../../../components/DetailsCards/DetailsCards';
import PlantDetailsTopRow from '../../../components/PlantDetailsTopRow/PlantDetailsTopRow';

function PlantDetailPage({details, sensorData}) {
  return (
    <div className='PlantDetailPage'>
        <PlantDetailsTopRow details={details} />
        {sensorData && Object.keys(sensorData).length !== 0 && (<DetailsCards sensorData={sensorData}/>)}
    </div>
  )
}

export default PlantDetailPage