import React from 'react'
import './PlantDetailPage.css';
import DetailsCards from '../../../components/DetailsCards/DetailsCards';
import PlantDetailsTopRow from '../../../components/PlantDetailsTopRow/PlantDetailsTopRow';

function PlantDetailPage({plantDetails, activePlantBatchId, activePlantNames, details, sensorData}) {
  return (
    <div className='PlantDetailPage'>
        <PlantDetailsTopRow plantDetails={plantDetails} details={details} activePlantBatchId={activePlantBatchId} activePlantNames={activePlantNames}/>
        {sensorData && Object.keys(sensorData).length !== 0 && (<DetailsCards sensorData={sensorData}/>)}
    </div>
  )
}

export default PlantDetailPage