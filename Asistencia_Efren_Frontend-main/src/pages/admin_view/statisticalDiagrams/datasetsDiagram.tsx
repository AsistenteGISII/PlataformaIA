import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import api from '../../../context/UserContext/API';

interface DatasetData {
  month: string;
  count: number;
}

export const DatasetsDiagram = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const fetchData = async (year: number) => {
    try {;
      const res = await api.get<DatasetData[]>(`/datasets/datasetsByYear/${year}`);
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
      <Typography variant="h6" gutterBottom textAlign={'center'} color={'#F3AF1C'}>
        Set de datos publicados en {year}
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
          color={'#F3AF1C'}  
        >
          <Typography>No hay registros para el año {year}</Typography>
        </Box>
      ) : (
        labels.length > 0 && (
          <Box sx={{
            padding: '2vh',
            height: '100%',
          }}>
            <BarChart
            xAxis={[{ scaleType: 'band', data: labels }]}
            series={[{ data, label: `Set de datos publicados en ${year}`, color: '#F3AF1C' }]}
            width={isSmallScreen ? 300 : isMediumScreen ? 670 : isLargeScreen ? 470: 600}
            height={isSmallScreen ? 300 :400}
          />
          </Box>
        )
      )}
    </Box>
  );
};