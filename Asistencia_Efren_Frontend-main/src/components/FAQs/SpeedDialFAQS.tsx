import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext/UserContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const actions = [
  { icon: <BugReportIcon />, name: 'Ticket' },
];

export default function SpeedDialFAQS() {
  const navigate = useNavigate();
  const Context = useContext(UserContext);

  const handleClick = () => {
    if (Context?.logged) {
      navigate('/ticket_redaction');
    } else {
      MySwal.fire({
        title: 'Necesitas iniciar sesión',
        text: 'Por favor, inicia sesión para realizar un reporte.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        customClass: {
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel',
        },
        didRender: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();

          if (confirmButton) {
            confirmButton.style.backgroundColor = '#1976d2'; // color azul
            confirmButton.style.color = '#fff';
          }

          if (cancelButton) {
            cancelButton.style.backgroundColor = '#grey';
            cancelButton.style.color = '#fff';
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Redirige a la página de inicio de sesión
        }
      });
    }
  }

  return (
    <Box sx={{ height: 1, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', zIndex: "1000", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick()}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
