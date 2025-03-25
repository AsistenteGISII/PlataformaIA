import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface DialogModalProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ open, title, message, onClose }) => {
  return (
    <Dialog open={open} aria-labelledby="dialog-title" aria-describedby="dialog-description" aria-hidden="false" aria-modal="true">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          >Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
