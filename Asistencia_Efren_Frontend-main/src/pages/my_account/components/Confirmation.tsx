import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface MyComponentProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ open, onClose, onDelete }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
                ¿Estás seguro de que quieres eliminar este registro?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Cancelar
                </Button>
                <Button onClick={onDelete} color='error' autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MyComponent;