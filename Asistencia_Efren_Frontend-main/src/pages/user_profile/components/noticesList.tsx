import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../../../context/UserContext/API';

interface MyComponentProps {
  idUser: string;
}
interface New {
  id: number;
  news_name: string;
  publish_date: string;
  small_description: string;
  cont_views: number;
};

const DatasetListPage = ({ idUser }: MyComponentProps) => {
  const [news, setNews] = useState<New[]>([]);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await api.get(`/relationshipNew/${idUser}`)
        if (res.data.user === null || res.data.user.length === 0) {
          setLoading(false);
          setNoData(true);
          setNews([]);
          return;
        }
        setNoData(false);
        setNews(res.data.user.news);
        setFilteredData(res.data.user.news);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getUserData()
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilteredData(news.filter((item: New) =>
        item.news_name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, news, loading]);

  return (
    <Box>
      <TextField
        style={{ marginTop: '25px' }}
        label="Buscar por Nombre"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <SearchIcon />
          ),
          style: {
            borderRadius: '15px',
            width: isSmallScreen ? 300 : 800,
            marginBottom: '30px',
          }
        }}
      />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CircularProgress />
        </Box>
      ) : noData ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          color={'#05254A'}
        >
          <Typography>Este usuario no ha publicado noticias</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              borderRadius: '10px',
            },
            padding: '10px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {filteredData.map((news: New) => (
              <Card key={news.id} style={{ marginBottom: '20px', minWidth: '300px', maxWidth: '800px' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '60px',
                          height: '60px',
                          marginRight: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#05254A',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <TableChartOutlinedIcon sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                      <Box>
                        <Typography variant="h6">{news.news_name}</Typography>
                        <Typography variant="body2">{news.publish_date}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2" color="text.secondary" sx={{ marginRight: '5px' }}>
                            {news.cont_views}
                          </Typography>
                          <VisibilityIcon color="action" />
                        </Box>
                        <Typography variant="body2">{news.news_name}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DatasetListPage;