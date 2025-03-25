import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import api from '../../../context/UserContext/API';

export const FormUserCreate = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verified, SetVerified] = useState(false);
  const [role, setRole] = useState('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const URL_USERS = '/users/';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {console.log(verified)
      const response = await api.post(`${URL_USERS}`, {
        email: email,
        fullname: name,
        username: username,
        password: password,
        verified: verified,
        user_role: role
      });
      handleClose();
    } catch (error: any) {
      console.error('Ocurrió un error', error);
      setErrorMessage(error.response?.data?.message || 'Ocurrió un error en el servidor');
    }
  };

  const handleVerified = (event: any) => {
    SetVerified(event === 'true');
  };
  

  const handleCancel = () => {
    navigate('/users_management/');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/users_management/');
  };

  return (
    <Box sx={{ margin: '100px auto', maxWidth: 600 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h3" align="center" mb={4}>
          Crear usuario
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre de usuario"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombre completo"
            name="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo electrónico"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Rol"
            >
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="USER">Usuario</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Verificado</InputLabel>
            <Select
              value={verified}
              onChange={(e) => handleVerified(e.target.value)}
              label="Verificado"
            >
              <MenuItem value="true">Verificado</MenuItem>
              <MenuItem value="false">No verificado</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            name="password"
            fullWidth
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {errorMessage && (
          <Typography color="error" textAlign="center" marginTop="20px">
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Button sx={{ marginRight: '20px' }} variant="contained" color="warning" size="large" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
            Enviar
          </Button>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar envío</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas crear este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
