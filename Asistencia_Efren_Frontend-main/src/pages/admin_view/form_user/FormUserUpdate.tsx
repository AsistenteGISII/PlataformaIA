import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../context/UserContext/API';

const URL_USERS = '/users/'

export const FormUserUpdate = () => {
  const capitalize = (str:string) => str && str[0].toUpperCase() + str.slice(1).toLowerCase();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verified, SetVerified] = useState(Boolean);
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`${URL_USERS}${id}`);
        setName(capitalize(response.data.fullname));
        setUsername(capitalize(response.data.username));
        setEmail(response.data.email.toLowerCase());
        SetVerified(response.data.verified);
        setRole(response.data.user_role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleVerified = (event: any) => {
    if (event == 'true') {
      SetVerified(true)
    } else if (event == 'false') {
      SetVerified(false)
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await api.put(`${URL_USERS}${id}`, {
      fullname: name,
      username: username,
      email: email,
      verified: verified,
      user_role: role
    });
    setOpen(false);
    navigate("/users_management/");
  };

  const handleCancel = () => {
    navigate("/users_management/");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ margin: '100px auto', maxWidth: 600 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h3" align="center" mb={4}>
          Actualizar usuario
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
            label="Nombre"
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
        </Box>

        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Button sx={{ marginRight: '20px' }} variant="contained" color="warning" size="large" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
            Actualizar
          </Button>
        </Box>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar edición</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas editar este usuario?
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
