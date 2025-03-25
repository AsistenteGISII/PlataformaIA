// src/components/UserRegistrationBarChart.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import api from '../../../context/UserContext/API';

interface UserRegistrationData {
  month: string;
  count: number;
}

export const UserDiagram = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const fetchData = async (year: number) => {
    try {
      const res = await api.get<UserRegistrationData[]>(`/users/usersByYear/${year}`);
      const fetchedData = res.data;

      if (fetchedData.length === 0) {
        setNoData(true);
        setLabels([]);
        setData([]);
        return;
      }
      setNoData(false);
      const months = fetchedData.map(item => {
        const date = new Date(item.month);
        const monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        return monthNames[date.getUTCMonth()];
      });

      const counts = fetchedData.map(item => item.count);

      setLabels(months);
      setData(counts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setNoData(true);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom textAlign={'center'} color={'#45B39D '}>
        Usuarios registrados en{year}
      </Typography>
      <Box display="flex" alignItems="center" margin={'2vh'}>
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={handleYearChange}
          sx={{ marginRight: 2 }}
        />
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : noData ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          color={'#45B39D'}
        >
          <Typography>No hay registros para el año {year}</Typography>
        </Box>
      ) : (
        labels.length > 0 && (
          <LineChart
            xAxis={[{ scaleType: 'band', data: labels }]}
            series={[{ data, label: `Usuarios registrados en ${year}` }]}
            width={isSmallScreen ? 340 : isMediumScreen ? 670 : isLargeScreen ? 550 : 600}
            height={isSmallScreen ? 300 : 400}
          />
        )
      )}
    </Box>
  );
};