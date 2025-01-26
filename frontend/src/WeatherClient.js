import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const WeatherClient = () => {

  const [weather,setWeather] = useState();
  const [location,setLocation] = useState('London');

  useEffect(()=>{
    axios.get(
        `http://localhost:3002/weather`,
        {
          params: {parsedLocation: location},
        }
      )
      .then((res) => {
        setWeather(res.data);
        console.log("weather");
        console.log(weather);
      })
      .catch((e) => {
        console.log("Error : " + e);
      });
  },[location])

  const searchHandler=(e)=>{
    setLocation(e.target.value);
  }

  return (
    <div style={{backgroundColor:"white",widt:"500px"}}>
    <div style={{color:"black", padding:"10px"}}>WeatherClient</div>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={searchHandler} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Temperature</StyledTableCell>
            <StyledTableCell align="right">Wind Speed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           
            <StyledTableRow>
              <StyledTableCell align="right">{weather?.location?.name}</StyledTableCell>
              <StyledTableCell align="right">{weather?.current?.temp_c}</StyledTableCell>
              <StyledTableCell align="right">{weather?.current?.wind_kph}</StyledTableCell>
            </StyledTableRow>
     

        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default WeatherClient