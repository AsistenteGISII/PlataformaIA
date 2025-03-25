import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { UserContext } from '../../../context/UserContext/UserContext';
import { resetPassword } from '../helpers/users';
import { validPasswordLength, validPasswordComplexity, passwordsAreTheSame } from '../helpers/validations'
import Swal from 'sweetalert2';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ChangePasswordProps {
    setVisible: (value:boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({setVisible}) => {
    const ContxValues = useContext(UserContext);
    const userEmail = ContxValues?.user?.email;

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [currentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

    const [formValidations, setFormValidations] = useState({
        validNewPassword: true,
        validConfPassword: true,
    });

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    const handleToggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible((prev) => !prev);
    };

    const handleToggleNewPasswordVisibility = () => {
        setNewPasswordVisible((prev) => !prev);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const isValidPassword = validPasswordLength(newPassword) && validPasswordComplexity(newPassword);
        const isSamePassword = passwordsAreTheSame(newPassword, confirmPassword);
    
        setFormValidations({
            validNewPassword: isValidPassword,
            validConfPassword: isSamePassword,
        });
    
        if (!userEmail) {
            Swal.fire({
                title: 'Usuario no encontrado',
                text: 'Hubo un problema al cambiar la contraseña. Verifica que se haya inciado sesión correctamente antes de proceder.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        try{
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            Swal.fire({
                title: 'Contraseña actualizada',
                text: 'Se ha actualizado la contraseña correctamente.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                setVisible(false);
            });
            await resetPassword(userEmail, currentPassword, newPassword);
        }catch(error:any){
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };       

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 3, maxWidth: '400px', width: '100%' }}>
                <Typography variant="h6" mb={2}>Cambiar Contraseña</Typography>
                <TextField
                    label="Contraseña Actual"
                    type={currentPasswordVisible ? "text" : "password"}
                    fullWidth
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onMouseDown={handleMouseDownPassword}
                                    onClick={handleToggleCurrentPasswordVisibility}>
                                    {currentPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Nueva Contraseña"
                    type={newPasswordVisible ? "text" : "password"}
                    fullWidth
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    error={!formValidations.validNewPassword}
                    helperText={!formValidations.validNewPassword && 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onMouseDown={handleMouseDownPassword}
                                    onClick={handleToggleNewPasswordVisibility}>
                                    {newPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Confirmar Nueva Contraseña"
                    type={confirmPasswordVisible ? "text" : "password"}
                    fullWidth
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    error={!formValidations.validConfPassword}
                    helperText={!formValidations.validConfPassword && 'La contraseña no coincide'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onMouseDown={handleMouseDownPassword}
                                    onClick={handleToggleConfirmPasswordVisibility}>
                                    {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="outlined" color="primary" type="submit">
                        Cambiar Contraseña
                    </Button>
                    <Button variant="outlined" color="error" onClick={()=>{setVisible(false)}}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
};

export { ChangePassword };
