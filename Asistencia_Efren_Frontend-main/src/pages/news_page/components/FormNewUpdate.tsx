import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../context/UserContext/API';

export const FormNewUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [news_name, setNews_name] = useState('');
  const [small_description, setSmall_description] = useState('');
  const [large_description, setLarge_description] = useState('');
  const [url_new, setUrl_new] = useState('');
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const response = await api.get(`/news/${id}`);
        setNews_name(response.data.news_name);
        setSmall_description(response.data.small_description);
        setLarge_description(response.data.large_description);
        setUrl_new(response.data.url_new);
      } catch (error) {
        console.error('Error fetching news data', error);
      }
    };
    fetchNewData();
  }, [id]);

  const handleUpdate = async () => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(url_new)) {
      setDialogInfo('Formato inválido', 'La URL de la noticia no cumple con el formato indicado');
      return;
    }

    try {
      await api.put(`/news/${id}`, {
        news_name: news_name,
        small_description: small_description,
        large_description: large_description,
        url_new: url_new,
      });
      setDialogInfo('Noticia actualizada', 'Se ha actualizado la noticia correctamente');
    } catch (error: any) {
      console.error('Ocurrió un error', error);
      setErrorMessage(error.response?.data?.message || 'Ocurrió un error en el servidor');
    }
  };

  const setDialogInfo = (title: string, message: string) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setOpen(true);
  };

  const handleCancel = () => {
    navigate("/news_management/");
  };

  const handleClose = () => {
    setOpen(false);
    if (dialogTitle.includes('Noticia')) {
      navigate("/news_management/");
    }
  };

  return (
    <Box sx={{ margin: '100px auto', maxWidth: 1000 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography textAlign="center" variant="h3" marginBottom="40px">
          Actualizar Noticia
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
              name="URL new"
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
          <Button sx={{ marginRight: '20px' }} variant="contained" color="warning" size="large" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={handleUpdate}>
            Actualizar
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
