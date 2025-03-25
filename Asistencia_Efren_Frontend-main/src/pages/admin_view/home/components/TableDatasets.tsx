import { GridSearchIcon } from '@mui/x-data-grid';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography, Tabs, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import api from '../../../../context/UserContext/API';

interface Dataset {
  user: any;
  id: number;
  dataset_name: string;
  autor?: string;
  score: string;
  publish_date: string;
  description?: string;
  url_source: string;
  papers: any;
  categories: any;
  version: Array<string>;
  status: string;
  privated: boolean;
}

export default function TableDatasets() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Dataset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Dataset[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [status, setStatus] = useState('Pending'); 
  const navigate = useNavigate();

  useEffect(() => {
    const getDatasetData = async () => {
      try {
        setLoading(true);
       
        const res = await api.get(`/datasets/getByStatus`, {
          params: { status }
        });

        const datasets = res.data.datasets.map((item: any) => item.dataset);
        setData(datasets);
        setFilteredData(datasets);

      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };
    getDatasetData();
  }, [status]);

  useEffect(() => {
    if (!loading) {
      const filteredDataset = data.filter((dataset: { dataset_name: any; }) =>
        (dataset.dataset_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredDataset);
    }
  }, [searchTerm, data, loading]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setStatus(newValue); 
    setPage(0); 
  };

  const handleOpenModal = (row: any) => {
    setSelectedRow(row);
  };

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckDataset = (id: number) => {
    navigate(`/datasets_management/${id}`);
  };

  const handleEditDataset = (id: number) => {
    navigate(`/edit_dataset/${id}`);
  };

  const handleAddDataset = () => {
    navigate(`/datasets/create/`);
  };

  return (
    <>
      <Typography textAlign={'center'} variant="h3" marginTop={'80px'}>
        Bandeja de Sets de Datos
      </Typography>
      <Box marginTop={'50px'}>
        <Tabs
          value={status}
          onChange={handleChangeTab}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Pendientes" value="Pending" />
          <Tab label="Aceptados" value="Accepted" />          
          <Tab label="Rechazados" value="Rejected" />
        </Tabs>

        <Box display="flex" justifyContent="space-between" margin="20px auto" padding="10px" width="1000px">
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputProps={{
              startAdornment: <GridSearchIcon />,
              style: { borderRadius: '15px', width: '400px' }
            }}
          />
          <Button onClick={(e) => { e.stopPropagation(); handleAddDataset(); }}>
            <Tooltip title="Agregar nuevo" arrow>
              <AddIcon />
            </Tooltip>
          </Button>
        </Box>
        
        <Box margin="20px auto" padding="10px" width="1000px">
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre Modelo</TableCell>
                    <TableCell>Autor</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">Cargando...</TableCell>
                    </TableRow>
                  ) : (
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Dataset) => (
                      <TableRow key={row.id} onClick={() => handleOpenModal(row)}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.dataset_name}</TableCell>
                        <TableCell>{row.user ? row.user.fullname : 'No especificado'}</TableCell>
                        <TableCell>
                          <Tooltip title="Revisar">
                            <Button onClick={(e) => { e.stopPropagation(); handleCheckDataset(row.id); }}>
                              <SearchIcon />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <Button onClick={(e) => { e.stopPropagation(); handleEditDataset(row.id); }}>
                              <EditIcon />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {filteredData && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
}