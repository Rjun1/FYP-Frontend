import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './Table.css';

export default function DenseTable({rows}) {
  
  return (
    <div className='Table'>
      <TableContainer component={Paper} sx={{height:'100%'}}>
        <Table sx={{ minWidth: 650, height:'100%'}} size="small" aria-label="a dense table">
          <TableHead className='TableHead'>
            <TableRow>
              <TableCell sx={{fontSize:'18px'}}>Crop type</TableCell>
              <TableCell sx={{fontSize:'18px'}} align="center">Batch No.</TableCell>
              <TableCell sx={{fontSize:'18px'}} align="center">Date Planted</TableCell>
              <TableCell sx={{fontSize:'18px'}} align="center">Harvest Date</TableCell>
              <TableCell sx={{fontSize:'18px'}} align="center">Expected Yield (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.name + 'TableRow' + index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{fontWeight:'bold'}}>
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.batchNum}</TableCell>
                <TableCell align="center">{row.datePlanted}</TableCell>
                <TableCell align="center">{row.harvestDate}</TableCell>
                <TableCell align="center">{row.expectedYield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}