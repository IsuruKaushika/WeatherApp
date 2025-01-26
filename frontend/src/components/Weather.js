import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

// Styled Table components
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WeatherClient = () => {
  const [weather, setWeather] = useState(null); // Weather data
  const [location, setLocation] = useState("London"); // Default location
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(false); // Loading state

  const API_KEY = "15a8519154a540fab9831808242303"; // Your Weather API key

  // Fetch weather data
  const fetchWeather = async () => {
    if (!location.trim()) {
      setError("City name cannot be empty.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Unable to fetch weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchWeather();
    }, 1000);

    return () => clearTimeout(debounceFetch);
  }, [location]);

  return (
    <div style={{ backgroundColor: "white", width: "500px", padding: "20px" }}>
      <h2>Weather Client</h2>
      <TextField
        id="outlined-basic"
        label="Enter City"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {loading && <CircularProgress style={{ display: "block", margin: "10px auto" }} />}

      {weather && !loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Temperature (°C)</StyledTableCell>
                <StyledTableCell align="right">Wind Speed (km/h)</StyledTableCell>
                <StyledTableCell align="right">Condition</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="right">{weather?.location?.name}</StyledTableCell>
                <StyledTableCell align="right">{weather?.current?.temp_c}</StyledTableCell>
                <StyledTableCell align="right">{weather?.current?.wind_kph}</StyledTableCell>
                <StyledTableCell align="right">{weather?.current?.condition?.text}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default WeatherClient;
