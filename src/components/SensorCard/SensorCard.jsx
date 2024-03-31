import React from 'react'
import './SensorCard.css'

import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import { getStyle } from '../../helperFunctions/utils';

function getBarBackgroundColor(status) {
    const lowercaseStatus = status.toLowerCase();
    const styles = {
        'attention': '#fff8fa',
        'critical': '#ffeaf1'
    }
    return styles[lowercaseStatus];
}
function SensorCard({title, unit, min, max, actual, optimal, status}) {
    console.log(title, 'min', min, 'max', max, 'actual', actual)
    if (actual < min ) {
        console.log("TOO LOW")
    } else if (actual > max) {
        console.log("TOO HIGH")
    }
    return (
    <span className='SensorCard'>
        <span className='wrapper'>
            <span style={{marginRight: '10px', fontSize: '20px'}}>
                <span style={{marginRight: '10px', fontSize: '20px', fontWeight: 'bold'}}>{title}</span>
                <span>{actual} </span>
                <span style={{fontSize: '13px'}}>{unit}</span>
            </span>
            <Box sx={{ width: '100%', color: getStyle(status).backgroundColor }}>
                <LinearProgress
                    variant="determinate"
                    value={(((actual - min) / (max - min)) * 100) > 100 ? 100 : (((actual - min) / (max - min)) * 100)}
                    // color="info"
                    className='progress-bar'
                    color="inherit"
                    sx={{ height: '16px'}} // Adjust the height to increase the thickness
                    style={{ borderRadius: '8px', width: '100%', backgroundColor: getBarBackgroundColor(status)}} // Apply a style for border radius
                />
            </Box>
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>{min}</span>
                {!actual ? <span>null</span> :
                    (actual < min ? 
                        (<span>Too <span style={{fontWeight:'bold'}}>LOW</span></span>) :
                        (actual > max ?
                            (<span>Too <span style={{fontWeight:'bold'}}>HIGH</span></span>) :
                            (<span></span>)))
                }
                <span>{max}</span>
            </span>
            
        </span>
        
    </span>
            
  )
}

export default SensorCard