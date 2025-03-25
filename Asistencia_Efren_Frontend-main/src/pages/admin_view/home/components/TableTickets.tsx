import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridSearchIcon } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../../../../context/UserContext/API';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MySwal = withReactContent(Swal);

const URL_TICKET = '/ticket/';

const theme = createTheme();

interface TicketData {
  id: number;
  id_user: number;
  title: string;
  message: string;
  status: string;
}

interface JustificationFormProps {
  row: TicketData;
  justificationRef: React.RefObject<HTMLInputElement>;
  statusRef: React.RefObject<HTMLSelectElement>;
}

const JustificationForm: React.FC<JustificationFormProps> = ({ row, justificationRef, statusRef }) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Justificación"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        inputRef={justificationRef}
        InputLabelProps={{
          style: { whiteSpace: 'nowrap' }
        }}
      />
      <Select
        label="Estado"
        fullWidth
        variant="outlined"
        defaultValue={row.status}
        inputRef={statusRef}
      >
        <MenuItem value="Pending">Pendiente</MenuItem>
        <MenuItem value="Completed">Completado</MenuItem>
        <MenuItem value="Rejected">Rechazado</MenuItem>
      </Select>
    </Box>
  </ThemeProvider>
);

export default function TableTickets() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmitJustification = async (row: TicketData, justification: string, status: string) => {
    try {
      await api.put(`${URL_TICKET}${row.id}`, {
        status,
        justification
      });

      setFilteredData(filteredData.map((ticket: TicketData) =>
        ticket.id === row.id ? { ...ticket, status } : ticket
      ));
      Swal.close();
    } catch (error) {
      console.error(`Error updating ticket ${row.id}:`, error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`${URL_TICKET}${id}`);
      setFilteredData(filteredData.filter((ticket: TicketData) => ticket.id !== id));
    } catch (error) {
      console.error(`Error eliminando ticket ${id}:`, error);
    }
  };

  const confirmDelete = (row: TicketData) => {
    MySwal.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro de que deseas eliminar el ticket con título "${row.title}"? Esta acción no se puede deshacer.`,
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

  const handleShowDetails = (row: TicketData) => {
    MySwal.fire({
      title: 'Detalles del reporte',
      html: `
        <div style="text-align: left; margin-left:1em;">
          <p><strong>Título:</strong> ${row.title}</p>
          <p><strong>Estado:</strong> ${row.status == 'Pending' ? 'Pendiente' : (row.status == 'Completed' ? 'Completado' : 'Rechazado')}</p>
          <p><strong>Mensaje:</strong> </br>
          ${row.message}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Responder',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        handleEdit(row);
      },
      customClass: {
        popup: 'swal-wide',
        title: 'swal-title',
        htmlContainer: 'swal-html'
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
      }
    });
  };

  const handleEdit = (row: TicketData) => {
    const justificationRef = React.createRef<HTMLInputElement>();
    const statusRef = React.createRef<HTMLSelectElement>();

    MySwal.fire({
      title: 'Justificar Cambio de Estado',
      html: `
        <div id="swal2-content" style="width: 100%;"></div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal-wide',
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      },
      didOpen: () => {
        const container = document.getElementById('swal2-content');
        if (container) {
          const root = createRoot(container);
          root.render(
            <JustificationForm row={row} justificationRef={justificationRef} statusRef={statusRef} />
          );
        }
      },
      preConfirm: () => {
        const status = statusRef.current?.value || '';
        const justification = justificationRef.current?.value || '';
        handleSubmitJustification(row, justification, status);
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
      }
    });
  };

  useEffect(() => {
    const getTicketData = async () => {
      try {
        const res = await api.get(`${URL_TICKET}`);
        setData(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTicketData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilteredData(data.filter((item: { title: any; status: string; }) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [searchTerm, data, loading]);

  const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography textAlign={'center'} variant="h3" marginTop={'80px'}>
        Reportes de usuario
      </Typography>
      <Box marginTop={'50px'}>
        <Box margin='20px auto' padding={'10px'} width={'1000px'}>
          <TextField
            label="Buscar por titulo"
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
        </Box>
        <Box margin='20px auto' padding={'10px'} width={'1000px'}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID usuario</TableCell>
                    <TableCell>Titulo</TableCell>
                    <TableCell>Mensaje</TableCell>
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
                    filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TicketData) => (
                      <TableRow key={row.id} onClick={() => handleShowDetails(row)}>
                        <TableCell>{row.id_user}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.message.length > 120 ? `${row.message.substring(0, 120)}...` : row.message}</TableCell>
                        <TableCell>{row.status == 'Pending' ? 'Pendiente' : (row.status == 'Completed' ? 'Completado' : 'Rechazado')}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Editar">
                              <Button style={{ color: "green", padding: "0px" }} onClick={(e) => { e.stopPropagation(); handleEdit(row); }} ><EditIcon color='primary' /></Button>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <Button onClick={(e) => { e.stopPropagation(); confirmDelete(row); }}><DeleteIcon style={{ color: "red" }} /></Button>
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
