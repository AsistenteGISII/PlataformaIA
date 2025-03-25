import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Grid, TextField, useMediaQuery, Pagination, Link, Breadcrumbs } from '@mui/material';
import { Key, useEffect, useState } from 'react';
import api from '../../../context/UserContext/API';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function DatasetCategory() {
  const { id, name:categoryName } = useParams();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const isMobile = useMediaQuery('(max-width:550px)');
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/datasets">
      Sets de datos
    </Link>,
    <Typography key="2" sx={{ color: 'text.primary' }}>
      {categoryName}
    </Typography>,
  ];

  const fetchData = async (page: number = 1) => {
    try {
      const response = await api.get(`/datasets/GetWithPagination`, {
        params: {
          page,
          limit: 12,
          search: searchTerm,
          category: id,
        },
      });
      setData(response.data.datasets);
      setTotalPages(response.data.totalPages);
      setCurrentPage(parseInt(response.data.currentPage));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); 
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchData()
  }, [searchTerm])

  const handlePageChange = (event: any, value: number) => {
    setCurrentPage(value);
    fetchData(value);
  };

  const handleCardClick = (datasetId: number) => {
    navigate(`/datasets/${datasetId}`);
  };

  const truncateText = (text: string, wordLimit = 15) => {
    const words = text.split(" ");
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(" ") + "..." 
      : text;
  };

  if (!categoryName || !data) {
    return (
      <Box padding="10px 150px" mt={10}> 
        <Typography variant="h6">No se encontró información sobre datasets</Typography>
      </Box>
    );
  }
  
  if (!data) {
    return (
      <Box padding="10px 150px" mt={10}> 
        <Typography variant="h6">Categoría no encontrada: {categoryName}</Typography>
      </Box>
    );
  }

  return (
    <Box padding="10px 150px" mt={10}>
      <Box display={'flex'} width={isMobile?'90%':'60%'} justifyContent={'center'} margin={'auto'} my={'20px'}>
          <TextField
              label="Buscar Set de datos"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              sx={{margin:'auto', width:'100%'}}
              InputProps={{
                  startAdornment: (
                      <SearchIcon />
                  ),
                  style: { borderRadius: '15px'}
              }}
          />                    
      </Box>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        {categoryName}
      </Typography>
      <Grid container spacing={2}>
        {data.map((dataset: { id: number; dataset_name: string; user: { fullname: string; }[]; description: string; }) => (
          <Grid item xs={12} sm={6} md={4} key={dataset.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleCardClick(dataset.id)}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{dataset.dataset_name}</Typography>
                <Typography color="textSecondary">Autor: {dataset.user ? dataset.user[0].fullname : 'No especificado'}</Typography>
                <Typography color="textSecondary">Descripción: {truncateText(dataset.description)}</Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape='rounded'
          sx={{ mt: '15px', display:'flex', justifyContent:'center' }}
      />
    </Box>
  );
}
