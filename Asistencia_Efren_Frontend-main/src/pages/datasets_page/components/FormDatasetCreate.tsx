import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Autocomplete, Paper, Tooltip, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../helpers/getdatasets';
import { UserContext } from '../../../context/UserContext/UserContext';
import CheckTerms from '../../terms_and_conditions/components/CheckTerms';
import { createdataset } from '../helpers/createdataset';
import { Category, validateUrls } from '../helpers/validations';
import SpeedDialFAQS from '../../../components/FAQs/SpeedDialFAQS';
import DialogModal from './DialogModal';

export const FormDatasetCreate = () => {
  // Dataset info
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [urlSource, setUrlSource] = useState('');
  const [urlPapers, setUrlPapers] = useState(['']); 
  const [selectedCategoryOptions, setSelectedCategoryOptions] = React.useState<Category[]>([]);

  // User info
  const ContxValues = useContext(UserContext);
  const ID_USER = ContxValues?.user?.id;
  
  // Categories
  const [categories, setCategories] = React.useState<Category[]>([]);
  
  // Dialog utils
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [created, setCreated] = useState(false);

  // Terms and conditions
  const [checkedTerms, setCheckedTerms] = useState(false);

  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };
    getCategoriesData();
  }, []);

  const setDialogInfo = (title: string, message: string, success: boolean) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (ID_USER === undefined) {
      setDialogInfo('Usuario no encontrado', 'El usuario actual no está disponible. Verifique que haya iniciado sesión correctamente.', false);
      return;
    }

    if (!checkedTerms) {
      setDialogInfo('Términos y condiciones', 'Debe aceptar los términos y condiciones para continuar.', false);
      return;
    }

    const urlsToCheck = [urlSource,  ...urlPapers];
    const { invalidUrls, hasDuplicates } = validateUrls(urlsToCheck);
    
    if (invalidUrls.length > 0) {
      setDialogInfo('URL inválida', `Las siguientes URLs no son válidas: ${invalidUrls.join(', ')}`, false);
      return;
    }

    if (hasDuplicates) {
      setDialogInfo('URL duplicada', 'Hay URLs duplicadas en los enlaces proporcionados. Por favor, revise la lista.', false);
      return;
    }

    if (selectedCategoryOptions.length === 0) {
      setDialogInfo('Categorías del dataset', 'Debe seleccionar al menos una categoría relacionada con el dataset', false);
      return;
    }
    try{
      await createDataset();
      setDialogInfo('Dataset creado exitosamente', 'El dataset ha sido creado exitosamente. Un administrador revisará la solicitud y valorará su contenido. Recibirás una notificación una vez que el proceso de evaluación haya concluido.', true);
    }catch(e){
      setDialogInfo('Algo salió mal','Hubo un error al crear el dataset. Inténtelo de nuevo más tarde.',false);
    }
    return;
  };

  const createDataset = async () =>{
    try {
      const id_user = Number(ID_USER);
      const datasetDetails = {
        id_user: id_user,
        dataset_name: datasetName,
        description: description,
        url_source: urlSource,
        url_papers: urlPapers,
        categories: selectedCategoryOptions,
      };
  
      await createdataset(datasetDetails); 
      clearForm();
      setCreated(true);
    } catch (error: any) {
      setCreated(false);
      throw new Error(`Error creando el dataset: ${error.message || error}`);
    }
  }

  const clearForm = () =>{
    setDatasetName("");
    setDescription("");
    setUrlSource("");
    setUrlPapers(['']);
    setSelectedCategoryOptions([]);
    setCheckedTerms(false);
  }

  const handleCategoryChange = (event: any, newValue: React.SetStateAction<Category[]>) => {
    setSelectedCategoryOptions(newValue);
  };

  const handleAddPaperUrl = () => {
    setUrlPapers([...urlPapers, '']);
  };

  const handleRemovePaperUrl = (index: number) => {
    const newUrls = urlPapers.filter((_, i) => i !== index);
    setUrlPapers(newUrls);
  };

  const handleCancel = () => {
    navigate("/datasets/")
  }

  const handleClose = () => {
    setOpenDialog(false);
    if(created)
      navigate('/datasets');
  };
  
  return (
    <>
      <Box margin={'100px auto auto auto'}>
        <Typography textAlign={'center'} variant='h3' marginBottom={'40px'}>
          Formulario para crear un Set de Datos
        </Typography>
        <Paper 
        elevation={3} 
        component="form"
        sx={{ padding: '20px', margin: 'auto', maxWidth: '80%' }}
        onSubmit={handleSubmit}
        >
          <Box sx={{ display: { xs: 'inline-block', md: 'flex' } }} alignItems="center" flexWrap={'wrap'}>
            <Box sx={{ width: { xs: '80%', md: '40%' }, mt: 0 }} margin={'auto'}>
              <Typography variant='h4' textAlign={'center'} noWrap>
                Información general
              </Typography>
              <TextField
                label="Nombre del set de datos"
                name="datasetName"
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoFocus
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                label="Descripción del set de datos"
                name="Description"
                helperText='Descripción detallada del set de datos'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 1000 }}
              />
            </Box>
            <Divider variant='middle' flexItem orientation='vertical' sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Divider flexItem sx={{ display: { xs: 'flex', md: 'none' }, margin: '20px 50px' }} />
            <Box sx={{ width: { xs: '80%', md: '40%' } }} margin={'auto'}>
              <Typography variant='h4' textAlign={'center'} noWrap>
                Información Tecnica
              </Typography>
              <Autocomplete
                multiple
                options={categories}
                getOptionLabel={(option) => option.categories_name}
                value={selectedCategoryOptions}
                onChange={handleCategoryChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{mt:2}}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Categorías seleccionadas"
                    helperText="Seleccione una o varias categorías para el dataset"
                    placeholder="Elija..."
                  />
                )}
              />
              <TextField
                label="URL del set de datos"
                name="URL sourse"
                helperText="URL del set de datos"
                value={urlSource}
                onChange={(e) => setUrlSource(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 200 }}
              />
              <Box>
                  {urlPapers.map((url, index) => (
                    <Box key={index} display="flex" alignItems="center" marginY={1}>
                      <TextField
                        label={"Paper"}
                        helperText={`URL del paper ${index + 1}`}
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...urlPapers];
                          newUrls[index] = e.target.value;
                          setUrlPapers(newUrls);
                        }}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ maxLength: 200 }}
                      />
                      {urlPapers.length > 1 && (
                        <Tooltip title="Remover URL de paper" arrow>
                          <Button
                            onClick={() => handleRemovePaperUrl(index)}
                            variant="outlined"
                            size="small"
                            sx={{ ml: 1, width: { xs: '20px', sm: '25px', md: '30px' }, minWidth: '20px' }}
                          >
                            -
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                  ))}
                  <Tooltip title="Agregar URL de paper" arrow>
                    <Button
                      onClick={handleAddPaperUrl}
                      variant="outlined"
                      size="small"
                      sx={{
                        marginTop: 1,
                        width: { xs: '20px', sm: '25px', md: '30px' },
                        minWidth: '20px',
                      }}
                    >
                      +
                    </Button>
                  </Tooltip>
                </Box>
            </Box>
          </Box>
          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
          <CheckTerms checkedTerms={checkedTerms} setCheckedTerms={setCheckedTerms} />
          <Grid container spacing={2} marginTop={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                color="warning" 
                size='large' 
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                size='large' 
                type='submit'
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <DialogModal
          open={openDialog}
          title={dialogTitle}
          message={dialogMessage}
          onClose={handleClose}
        />
      </Box>
      <SpeedDialFAQS />
    </>
  );
};
