import React from 'react'
import './PlantDetailPage.css';
import DetailsCards from '../../../components/DetailsCards/DetailsCards';
import PlantDetailsTopRow from '../../../components/PlantDetailsTopRow/PlantDetailsTopRow';

function PlantDetailPage({details}) {
  return (
    <div className='PlantDetailPage'>
        <PlantDetailsTopRow details={details}/>
        <DetailsCards details={details}/>
    </div>
  )
}

export default PlantDetailPage