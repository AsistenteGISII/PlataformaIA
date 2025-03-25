import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Box, Divider, Tooltip, Paper, Autocomplete, Grid, FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Category, isValidVersion, validateUrls } from '../helpers/validations';
import { UserContext } from '../../../context/UserContext/UserContext';
import { fetchDatasetData, getCategories } from '../helpers/getdatasets';
import { updatedataset } from '../helpers/updatedataset';
import CheckTerms from '../../terms_and_conditions/components/CheckTerms';
import DialogModal from './DialogModal';
import SpeedDialFAQS from '../../../components/FAQs/SpeedDialFAQS';

export const FormDatasetUpdate = () => {
  // Información del dataset
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
        const categoriesData = await getCategories();
        setCategories(categoriesData)

        const dataset = await fetchDatasetData(DATASET_ID);
        setDatasetName(dataset.dataset_name);
        setDescription(dataset.description);
        setVersion(dataset.version);
        setPrivated(dataset.privated);
        setUrlSource(dataset.url_source);
        setUrlPapers(dataset.papers);
        setSelectedCategoryOptions(dataset.categories);

        // Guarda el estado original de las listas para comprobaciones del update
        setOriginalPapers(dataset.papers);
        setOriginalCategories(dataset.categories);
      } catch (error) {
        //TODO: manejo de error
      }
    };
    fetchData();
  }, [DATASET_ID]);

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

    if (versionError) {
      setDialogInfo('Formato de versión', 'El formato de la versión no sigue los lineamientos establecidos.', false);
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
      setDialogInfo('Categorías del set de datos', 'Debe seleccionar al menos una categoría relacionada con el set de datos', false);
      return;
    }

    try{
      await updateDataset();
      setDialogInfo('Set de datos actualizado exitosamente', 'El set de datos ha sido actualizado exitosamente.', true);
    }catch(e){
      setDialogInfo('Algo salió mal','Hubo un error al actualizar el set de datos. Inténtelo de nuevo más tarde.',false);
    }
    return;
  };

  const updateDataset = async () =>{
    try {
      const finalPapers = urlPapers !== originalPapers ? urlPapers : [];
      const finalCategories = selectedCategoryOptions !== originalCategories ? selectedCategoryOptions : [];
      const datasetDetails = {
        dataset_name: datasetName,
        description: description,
        url_source: urlSource,
        url_papers: finalPapers,
        privated: privated,
        version: version,
        categories: finalCategories,
      };
  
      await updatedataset(DATASET_ID, datasetDetails); 
      setUpdated(true);
    } catch (error: any) {
      throw new Error(`Error actualizando el set de datos: ${error.message || error}`);
    }
  }

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

  const handleCancel = () => {
    navigate(-1);
  }

  const handleClose = () => {
    setOpenDialog(false);
    if(updated)
      navigate('/account')
  };

  return (
    <>
      <Box margin={'100px auto auto auto'}>
        <Typography textAlign={'center'} variant='h3' marginBottom={'40px'}>
          Actualizar Set de datos
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
              <Tooltip title={"Si el set de datos es privado, no estará disponible para otros usuarios"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!privated} // Debe ser lo opuesto a lo almacenado en DB para indicar si el dataset es público o no
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
            <Divider variant='middle' flexItem orientation='vertical' sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Divider flexItem sx={{ display: { xs: 'flex', md: 'none' }, margin: '20px 50px' }} />
            <Box sx={{ width: { xs: '80%', md: '40%' } }} margin={'auto'} mt ={0}>
              <Typography variant='h4' textAlign={'center'} noWrap>
                Informatión tecnica
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
                    helperText="Seleccione una o varias categorías para el set de datos"
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

