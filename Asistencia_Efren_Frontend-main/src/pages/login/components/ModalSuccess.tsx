import React from 'react';
import { Modal, ModalDialog, Typography, Button, Box } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface ModalSuccessProps {
  open: boolean;
  onClose: () => void;
  message: string | null;
  modalType: boolean;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({ open, onClose, message, modalType }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); 
    if(modalType)
      navigate('/login')
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <Typography id="nested-modal-title" component="h2" sx={{ textAlign: 'center' }}>
          Revisa tu bandeja de entrada
        </Typography>
        <Typography id="nested-modal-description" textColor="text.tertiary">
          {message}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row-reverse' } }}>       
          <Button variant="solid" onClick={handleClose}>
            {modalType ? 'Ir a Inicio de Sesión' : 'Cerrar'}
          </Button>
        </Box> 
      </ModalDialog>
    </Modal>
  );
};

export default ModalSuccess;
