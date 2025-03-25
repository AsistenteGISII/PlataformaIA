import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { GridSearchIcon } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../../../../context/UserContext/API';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createTheme } from '@mui/material/styles';
import { User } from '../../../../context/UserContext/types';
import { UserContext } from '../../../../context/UserContext/UserContext';

const MySwal = withReactContent(Swal);

const URL_USERS = '/users/';

const theme = createTheme();

export default function TableModels() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const navigate = useNavigate();
  const Context = useContext(UserContext);
  const USER_ID = Context?.user.id;

  const handleOpenModal = (row: any) => {
    setSelectedRow(row);
    // setOpen(true);
  };

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`${URL_USERS}${id}`);
      setFilteredData(filteredData.filter((user: User) => user.id !== id));
    } catch (error) {
      console.error(`Error eliminando user ${id}:`, error);
    }
  };

  const confirmDelete = (row: User) => {
    MySwal.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro de que deseas eliminar el usuario "${row.fullname}"? Esta acción no se puede deshacer.`,
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
      preConfirm: () => handleDelete(row.id)
    });
  };

  const handleEdit = (id: number) => {
    navigate(`/users_management/form_user_update/${id}`);
  };

  const handleAddUser = () => {
    navigate(`/users_management/form_user_create/`);
  };

  useEffect(() => {
    const getuserData = async () => {
      try {
        const res = await api.get(`${URL_USERS}`);
        setData(res.data.filter((user: User) => user.id != USER_ID));
        setFilteredData(res.data.filter((user: User) => user.id != USER_ID));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getuserData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilteredData(data.filter((item: { fullname: any; }) =>
        item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, data, loading]);

  return (
    <>
      <Typography textAlign={'center'} variant="h3" marginTop={'80px'}>
        Bandeja de Usuarios
      </Typography>
      <Box marginTop={'50px'}>
        <Box display="flex" justifyContent="space-between" margin="20px auto" padding="10px" width="1000px">
          <TextField
            label="Buscar por nombre"
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
          <Button onClick={(e) => { e.stopPropagation(); handleAddUser(); }}>
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
                    <TableCell>ID usuario</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">Cargando...</TableCell>
                    </TableRow>
                  ) : (
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: User) => (
                      <TableRow key={row.id} onClick={() => handleOpenModal(row)}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.fullname}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.verified ? 'Verificado' : 'No verificado'}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Editar">
                              <Button onClick={(e) => { e.stopPropagation(); handleEdit(row.id); }}>
                                <EditIcon />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <Button onClick={(e) => { e.stopPropagation(); confirmDelete(row); }}>
                                <DeleteIcon style={{ color: "red" }} />
                              </Button>
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
