import React, { useContext, useEffect, useState, FormEvent } from 'react';
import { TextField, Button, Typography, Tooltip, Box, Divider, Autocomplete, Paper, Grid, Checkbox, FormControlLabel, Switch, FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext/UserContext'
import { updatedataset } from './helpers/updatedataset';
import { getCategories, fetchDatasetData } from './helpers/getdatasets'
import { validateUrls, isValidVersion, Category } from './helpers/validations'
import SpeedDialFAQS from "../../../components/FAQs/SpeedDialFAQS";
import DialogModal from '../home/components/DialogModal';
import CheckTerms from '../../terms_and_conditions/components/CheckTerms';

export const FormDatasetUpdate = () => {
  // Información del set de datos
  const { id } = useParams<{ id: string }>();
  const DATASET_ID = Number(id);
  const [datasetName, setDatasetName] = useState('');
  const [description, setDescription] = useState('');
  const [urlSource, setUrlSource] = useState('');
  const [urlPapers, setUrlPapers] = useState(['']); 
  const [privated, setPrivated] = useState(false);
  const [version, setVersion] = useState('');
  const [versionError, setVersionError] = useState(false);
  const [selectedCategoryOptions, setSelectedCategoryOptions] = React.useState<Category[]>([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('');
  const [views, setViews] = useState(0);
  const [publishDate, setPublishDate] = useState<string>('');
  const statusMapping = {
    Pending: 'Pendiente',
    Accepted: 'Aceptado',
    Rejected: 'Rechazado',
  };

  // Listas originales
  const [originalPapers, setOriginalPapers] = useState(['']);
  const [originalCategories, setOriginalCategories] = React.useState<Category[]>([]);

  // Terminos and condiciones
  const [checkedTerms, setCheckedTerms] = useState(false);

  // Categorías
  const [categories, setCategories] = React.useState<Category[]>([]);
  
  // Útiles del modal
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');  
  const [success, setSuccess] = useState(false);
  const [updated, setUpdated] = useState(false);

  // Información del usuario
  const ContxValues = useContext(UserContext);
  const ID_USER = ContxValues?.user?.id;
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carga las categorías
        const categoriesData = await getCategories();
        setCategories(categoriesData)
        // Carga la información del dataset por ID
        const dataset = await fetchDatasetData(DATASET_ID);
        setDatasetName(dataset.dataset_name);+
        setDescription(dataset.description);
        setUrlSource(dataset.url_source);
        setUrlPapers(dataset.papers); 
        setVersion(dataset.version);
        setPrivated(dataset.privated);
        setSelectedCategoryOptions(dataset.categories); 
        setScore(dataset.score);
        setViews(dataset.cont_views);
        setStatus(dataset.status);
        setPublishDate(dataset.publish_date);
        // Guarda el estado original de las listas para comprobaciones del update
        setOriginalPapers(dataset.papers);
        setOriginalCategories(dataset.categories);
      } catch (error) {
        // TODO: manejo de error
      }
    };
    fetchData();
  }, [DATASET_ID]);

  const setDialogInfo = (title: string, message: string, success: boolean) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setSuccess(success);
    setOpenDialog(true);
  };
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ID_USER === undefined) {
      setDialogInfo('Usuario no encontrado', 'El usuario actual no está disponible. Verifique que haya iniciado sesión correctamente.', false);
      return;
    }
  
    if (!checkedTerms) {
      setDialogInfo('Términos y condiciones', 'Debe aceptar los términos y condiciones para continuar.', false);
      return;
    }
  
    if (success) {
      await updateDataset(); 
      setDialogInfo("Set de datos actualizado exitosamente", "El set de datos ha sido actualizado exitosamente.", true);
      return;
    }
  
    if (versionError) {
      setDialogInfo('Formato de versión', 'El formato de la versión no sigue los lineamientos establecidos.', false);
      return;
    }
    
    const urlsToCheck = [urlSource, ...urlPapers];
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
      setDialogInfo('Categorías del set de datos', 'Debe seleccionar al menos una categoría relacionada con el set de datos', false);
      return;
    }
    
    try {
      await updateDataset();
      setDialogInfo("Set de datos actualizado exitosamente", "El set de datos ha sido actualizado exitosamente.", true);
    } catch (e) {
      setDialogInfo("Algo salió mal", "Hubo un error al actualizar el set de datos. Inténtelo de nuevo más tarde.", false);
    }
    return;
  };
  
  const updateDataset = async () => {
    try {
      const finalPapers = urlPapers !== originalPapers ? urlPapers : [];
      const finalCategories = selectedCategoryOptions !== originalCategories ? selectedCategoryOptions : [];
      const datasetDetails = {
        dataset_name: datasetName,
        description: description,
        url_source: urlSource,
        url_papers: finalPapers,
        categories: finalCategories,
        version,
        privated,
        score,
        status,
        publish_date: publishDate,
        cont_views: views,
      };
  
      await updatedataset(DATASET_ID, datasetDetails);
      setUpdated(true);
    } catch (error: any) {
      throw new Error(`Error actualizando el set de datos: ${error.message || error}`);
    }
  }; 

  const handleCategoryChange = (_event: any, newValue: React.SetStateAction<Category[]>) => {
    setSelectedCategoryOptions(newValue);
  };

  const handleAddPaperUrl = () => {
    setUrlPapers([...urlPapers, '']);
  };

  const handleRemovePaperUrl = (index: number) => {
    const newUrls = urlPapers.filter((_, i) => i !== index);
    setUrlPapers(newUrls);
  };

  const handleVersionChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setVersion(value);
    if (isValidVersion(value)) { 
      setVersionError(false);
    } else {
      setVersionError(true);
    }
  };

  const handleScoreChange = (e: any) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setScore(value);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleViewsChange = (e: any) => {
    const value = Math.max(0, Number(e.target.value));
    setViews(value);
  };
  
  const handleCancel = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  const handleClose = () => {
    setOpenDialog(false);
    if(dialogTitle === 'Precisión del set de datos')
      setSuccess(true);
    if(updated)
      navigate('/datasets_management')
  };

  return (
    <>
      <Box margin={'100px auto auto auto'}>
        <Typography textAlign={'center'} variant='h3' marginBottom={'40px'}>
          Formulario para actualizar un Set de Datos
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
                label="Descripción"
                name="Description"
                helperText='Introducción corta del set de datos'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 1000 }}
              />
              <Box display="flex" gap={2} sx={{ width: '100%' }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  sx={{ flex: 1 }} 
                >
                  <Tooltip title="Si el set de datos es privado, no estará disponible para otros usuarios">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!privated}
                          onChange={(e) => setPrivated(!e.target.checked)}
                          color="primary"
                        />
                      }
                      label={privated ? "Privado" : "Público"}
                    />
                  </Tooltip>
                  <FormHelperText>
                    Condición del set de datos
                  </FormHelperText>
                </Box>
                <TextField
                  label="Fecha de publicación"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  sx={{ flex: 1 }} 
                />
              </Box>
              <Box
                display="flex"
                gap={2} 
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  alignItems: 'flex-start',
                }}
              >
                <Tooltip title={"Por favor, siga el formato indicado en el ejemplo"}>
                  <TextField
                    label="Versión"
                    value={version} 
                    onChange={handleVersionChange}
                    fullWidth
                    margin="normal"
                    required
                    helperText='Versión del set de datos. Ejemplo: "1.0.0"'
                    inputProps={{ maxLength: 10 }} 
                  />
                </Tooltip>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    label="Status"
                    required
                  >
                    {Object.keys(statusMapping).map((key) => (
                      <MenuItem key={key} value={key}>
                        {statusMapping[key as keyof typeof statusMapping]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                gap={2} 
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  alignItems: 'center',
                }}
              >
                <TextField
                  label="Puntuación"
                  type="number"
                  value={score}
                  onChange={handleScoreChange}
                  fullWidth
                  margin="normal"
                  inputProps={{ min: 0, max: 100 }}
                  required
                />
                <TextField
                  label="Vistas"
                  type="number"
                  value={views}
                  onChange={handleViewsChange}
                  fullWidth
                  margin="normal"
                  inputProps={{ min: 0 }}
                  required
                />
              </Box>
            </Box>
            <Divider variant='middle' flexItem orientation='vertical' sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Divider flexItem sx={{ display: { xs: 'flex', md: 'none' }, margin: '20px 50px' }} />
            <Box sx={{ width: { xs: '80%', md: '40%' } }} margin={'0 auto auto auto'}>
              <Typography variant='h4' textAlign={'center'} noWrap>
                Información Técnica
              </Typography>
              <Autocomplete
                multiple
                options={categories || []}
                getOptionLabel={(option) => option.categories_name}
                value={selectedCategoryOptions}
                onChange={handleCategoryChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Categorías seleccionadas"
                    helperText="Seleccione una o varias categorías para el set de datos"
                    placeholder="Elija..."
                  />
                )}
              />
              <TextField
                label="Código"
                helperText="URL del Google Colab"
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
                Actualizar
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

export default FormDatasetUpdate;
