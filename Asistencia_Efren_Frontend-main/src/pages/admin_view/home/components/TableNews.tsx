import { GridSearchIcon } from '@mui/x-data-grid';
import { Box, Button, createTheme, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import api from '../../../../context/UserContext/API';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface New {
  user: any;
  id: number;
  news_name: string;
  autor?: string;
  small_description: string;
  large_description: string;
  score: string;
  publish_date: string;
  url_new: string;
  version: Array<string>;
  status: string;
  cont_views: number;
}

export default function TableModels() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<New[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<New[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  const theme = createTheme();

  useEffect(() => {
    const getNewData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/news/getAllWithUser`);
        const news = res.data.data;

        setData(news);
        setFilteredData(news);

      } catch (error) {
        console.error('Error fetching models:', error);
      } finally {
        setLoading(false);
      }
    };
    getNewData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const filteredNews = data.filter((item: { news_name: any; }) =>
        (item.news_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredNews);
    }
  }, [searchTerm, data, loading]);

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

  const handleCheckModel = (id: number) => {
    navigate(`/news_management/${id}`);
  };

  const handleAddModel = () => {
    navigate(`/news/create/`);
  };

  const handleEdit = (id: number) => {
    navigate(`/news/update/${id}`);
  };

  const handleDelete = (id: number) => {
    MySwal.fire({
      title: 'Confirmar eliminación',
      text: `¿Está seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal-wide',
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      },
      didRender: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
  
        if (confirmButton) {
          confirmButton.style.backgroundColor = theme.palette.primary.main;
          confirmButton.style.color = '#fff';
        }
  
        if (cancelButton) {
          cancelButton.style.backgroundColor = theme.palette.grey[500];
          cancelButton.style.color = '#fff';
        }
      },
      preConfirm: () => {
        api.delete(`/news/${id}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            MySwal.fire('Eliminado', 'La noticia ha sido eliminada con éxito', 'success');
          })
          .catch((error) => {
            console.error('Error al eliminar la noticia:', error);
            MySwal.fire('Error', 'Hubo un problema al eliminar la noticia', 'error');
          });
      }
    });
  };
  
  return (
    <>
      <Typography textAlign={'center'} variant="h3" marginTop={'80px'}>
        Bandeja de Noticias
      </Typography>
      <Box marginTop={'50px'}>
        <Box display="flex" justifyContent="space-between" margin="20px auto" padding="10px" width="1000px">
          <TextField
            label="Buscar por título"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputProps={{
              startAdornment: <GridSearchIcon />,
              style: {
                borderRadius: '15px',
                width: '400px'
              }
            }}
          />
          <Button onClick={(e) => { e.stopPropagation(); handleAddModel(); }}>
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
                    <TableCell>Título de Noticia</TableCell>
                    <TableCell>Autor</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">Cargando...</TableCell>
                    </TableRow>
                  ) : (
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: New) => (
                      <TableRow key={row.id} onClick={() => handleOpenModal(row)}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.news_name}</TableCell>
                        <TableCell>{row.user ? row.user.fullname : 'No especificado'}</TableCell>
                        <TableCell>{row.small_description}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Editar">
                              <Button onClick={(e) => { e.stopPropagation(); handleEdit(row.id); }}>
                                <EditIcon />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}>
                                <DeleteIcon style={{ color: "red" }}/>
                              </IconButton>
                            </Tooltip>
                          </Box>                          
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
