import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './Table.css';

function createData(name, batchNum, datePlanted, harvestDate, expectedYield) {
  return { name, batchNum, datePlanted, harvestDate, expectedYield };
}

const rows = [
  createData('Bok Choy', 1, '1 Jan 2024', '31 Jan 2024', 4.0),
  createData('Choy Sum', 2, '2 Jan 2024', '1 Feb 2024', 4.3),
  createData('Kai Lan', 3, '4 Jan 2024', '10 Feb 2024', 6.0),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper} className='Table'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
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
  );
}