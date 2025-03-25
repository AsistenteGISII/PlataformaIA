import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../context/UserContext/API';
import { UserContext } from '../../../context/UserContext/UserContext';

export const FormNewCreate = () => {

  const [news_name, setNews_name] = useState('');
  const [small_description, setSmall_description] = useState('');
  const [large_description, setLarge_description] = useState('');
  const [url_new, setUrl_new] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const ContxValues = useContext(UserContext);
  const ID_USER = ContxValues?.user?.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(url_new)) {
      setDialogInfo('Formato inválido','La URL de la noticia no cumple con el formato indicado');
      return;
    }

    try {
      await api.post(`/news/`, {
        userID: ID_USER,
        news_name,
        small_description,
        large_description,
        url_new,
      });
      setDialogInfo('Noticia agregada','Se ha agregado la noticia correctamente');
    } catch (error: any) {
      console.error('Ocurrió un error', error);
      setErrorMessage(error.response?.data?.message || 'Ocurrió un error en el servidor');
    }
  };

  const setDialogInfo = (tittle: string, message: string) =>{
    setDialogTitle(tittle);
    setDialogMessage(message);
    setOpen(true);
  }
  
  const handleCancel = () => {
    navigate("/news_management/");
  };

  const handleClose = () => {
    setOpen(false);
    if(dialogTitle.includes('Noticia'))
      navigate("/news_management/");
  };

  return (
    <Box sx={{ margin: '100px auto', maxWidth: 1000 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography textAlign="center" variant="h3" marginBottom="40px">
          Formulario para crear una Noticia
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
          >
          <Box sx={{ flex: 1, padding: '20px' }}>
            <Typography variant="h4" textAlign="center">
              Información corta
            </Typography>
            <TextField
              label="Nombre de la noticia"
              name="newName"
              value={news_name}
              onChange={(e) => setNews_name(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              label="Descripción corta"
              name="smallDescription"
              value={small_description}
              onChange={(e) => setSmall_description(e.target.value)}
              fullWidth
              multiline
              rows={6}
              margin="normal"
              inputProps={{ maxLength: 200 }}
            />
          </Box>
          <Divider
            variant="middle"
            orientation="vertical"
            flexItem
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
          <Box sx={{ flex: 1, padding: '20px' }}>
            <Typography variant="h4" textAlign="center">
              Información extensa
            </Typography>
            <TextField
              label="Descripción larga"
              name="largeDescription"
              value={large_description}
              onChange={(e) => setLarge_description(e.target.value)}
              fullWidth
              multiline
              rows={6}
              margin="normal"
              inputProps={{ maxLength: 1500 }}
            />
            <TextField
              label="URL de la noticia"
              name="URL noticia"
              value={url_new}
              onChange={(e) => setUrl_new(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 200 }}
            />
          </Box>
        </Box>

        {errorMessage && (
          <Typography color="error" textAlign="center" marginTop="20px">
            {errorMessage}
          </Typography>
        )}

        <Box marginTop="40px" textAlign="center">
          <Button
            sx={{ marginRight: '20px' }}
            variant="contained"
            color="warning"
            size="large"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" size="large">
            Agregar
          </Button>
        </Box>  
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="success-dialog-title"
          aria-describedby="success-dialog-description"
        >
          <DialogTitle id="success-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="success-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
  
};
