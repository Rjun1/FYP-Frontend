import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './HistoricalData.css';

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('PlantBatchId'); // Default search type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://eefypintegration.azurewebsites.net/plant/allHarvestedPlantBatchInfo');
        if (!response.ok) {
          throw new Error('Failed to fetch historical data');
        }
        const data = await response.json();
        setHistoricalData(data.result);
      } catch (error) {
        console.error('Error fetching historical data:', error.message);
      }
    };
    fetchData();
  }, []);

  const filteredData = () => {
    if (searchTerm.trim() === '') {
      return historicalData;
    }

    return historicalData.filter(item => {
      if (searchType === 'PlantBatchId') {
        return item.PlantBatchId.toString().includes(searchTerm);
      } else if (searchType === 'PlantName') {
        return item.PlantName.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  };

  return (
    <div className="historical-data-container">
      <div className="search-container">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="PlantBatchId">Plant Batch ID</option>
          <option value="PlantName">Plant Name</option>
        </select>
      </div>

      <div className="table-scroll-container">
        <Box bgcolor="background.paper" className="table-container">
          <TableContainer component={Paper}>
            <Table aria-label="historical data table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Plant Batch ID</TableCell>
                  <TableCell align="center">Plant Name</TableCell>
                  <TableCell align="center">Quantity Planted</TableCell>
                  <TableCell align="center">Weight Harvested</TableCell>
                  <TableCell align="center">Date Harvested</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData().map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">{item.PlantBatchId}</TableCell>
                    <TableCell align="center">{item.PlantName}</TableCell>
                    <TableCell align="center">{item.QuantityPlanted}</TableCell>
                    <TableCell align="center">{item.WeightHarvested}</TableCell>
                    <TableCell align="center">{new Date(item.DateHarvested).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default HistoricalData;
