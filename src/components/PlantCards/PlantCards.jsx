import React, { useState, useEffect } from 'react'
import PlantCard from '../PlantCard/PlantCard'
import './PlantCards.css'

// Import MUI components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(() => ({
  color: '#3e8873',
  backgroundColor: '#BDC9C6',
  '&:hover': {
    color: '#f2fffb',
    backgroundColor: '#3e8873',
  },
  width: '100%',
  height: '100%',
  fontSize: '30px',

  fontFamily: 'Poppins',
}));

const Cards = ({latestActiveSensorData, activeBatchInfo}) => {

    return (
        <div className = "Cards">
            {
                activeBatchInfo && activeBatchInfo.length > 0 &&
                activeBatchInfo.map(batchInfo => <PlantCard key={batchInfo._id} batchInfo={batchInfo} />)
            }
            { /* Show grow button when less than 3 plant types*/
                activeBatchInfo && activeBatchInfo.length < 3 &&
                (<div className='GrowCard'>
                    <ColorButton variant="contained">Grow</ColorButton>
                </div>)
            }
        </div>
    )
}

export default Cards