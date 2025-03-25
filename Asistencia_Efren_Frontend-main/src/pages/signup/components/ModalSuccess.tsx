import { Dispatch, SetStateAction, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalDialog, Button, Typography, Box } from '@mui/joy'; 

type ModalSuccessProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    children?: ReactNode 
};

export const ModalSuccess = ({ open, setOpen, children }: ModalSuccessProps) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ModalDialog
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
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
                <Typography id="modal-title" component="h2" sx={{ textAlign: 'center' }}>
                    Registro completado exitosamente
                </Typography>

                <Typography id="modal-description" textColor="text.tertiary">
                    {children}
                </Typography>
                
                <Box sx={{ mt: 1, display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row-reverse' } }}>
                    <Link to="/login">
                        <Button variant="solid" color="primary" sx={{ width: "100%" }}>
                            Ir a Inicio de Sesión
                        </Button>
                    </Link>
                </Box>
            </ModalDialog>
        </Modal>
    );
};
