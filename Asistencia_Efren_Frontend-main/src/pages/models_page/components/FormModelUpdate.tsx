import React, { useContext, useEffect, useState, FormEvent } from 'react';
import { TextField, Button, Typography, Tooltip, Box, Divider, Autocomplete, Paper, Grid, Checkbox, FormControlLabel, Switch, FormHelperText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext/UserContext';
import DialogModal from './DialogModal';
import { updatemodel } from '../helpers/updatemodel';
import { getCategories, fetchModelData } from '../helpers/getmodels'
import { validateUrls, validateColabUrl, isValidVersion, Category } from '../helpers/validations'
import SpeedDialFAQS from "../../../components/FAQs/SpeedDialFAQS";
import CheckTerms from '../../terms_and_conditions/components/CheckTerms';

export const FormModelUpdate = () => {
  // Información del modelo
  const { id } = useParams<{ id: string }>();
  const MODEL_ID = Number(id);
  const [modelName, setModelName] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [largeDescription, setLargeDescription] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [previousAccuracy, setPreviousAccuracy] = useState(0);
  const [isNaChecked, setIsNaChecked] = useState(false);
  const [urlColab, setUrlColab] = useState('');
  const [urlDatasets, setUrlDatasets] = useState(['']);
  const [urlPapers, setUrlPapers] = useState(['']); 
  const [privated, setPrivated] = useState(false);
  const [version, setVersion] = useState('');
  const [versionError, setVersionError] = useState(false);
  const [selectedCategoryOptions, setSelectedCategoryOptions] = React.useState<Category[]>([]);

  // Listas originales
  const [originalDatasets, setOriginalDatasets] = useState(['']);
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
        // Carga la información del modelo por ID
        const model = await fetchModelData(MODEL_ID);
        setModelName(model.model_name);
        setSmallDescription(model.small_description);
        setLargeDescription(model.large_description);
        setAccuracy(model.accuracy);
        setIsNaChecked(model.accuracy === -1);
        setUrlColab(model.url_colab);
        setUrlDatasets(model.datasets); 
        setUrlPapers(model.papers); 
        setVersion(model.version);
        setPrivated(model.privated);
        setSelectedCategoryOptions(model.categories); 
        // Guarda el estado original de las listas para comprobaciones del update
        setOriginalDatasets(model.datasets);
        setOriginalPapers(model.papers);
        setOriginalCategories(model.categories);
      } catch (error) {
        // TODO: manejo de error
      }
    };
    fetchData();
  }, [MODEL_ID]);

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
      await updateModel(); 
      setDialogInfo("Modelo actualizado exitosamente", "El modelo ha sido actualizado exitosamente.", true);
      return;
    }
  
    if (versionError) {
      setDialogInfo('Formato de versión', 'El formato de la versión no sigue los lineamientos establecidos.', false);
      return;
    }
  
    if (urlColab && !validateColabUrl(urlColab)) {
      setDialogInfo('URL inválida', 'Por favor ingresar una URL de Google Colab.', false);
      return;
    }
  
    const urlsToCheck = [urlColab, ...urlDatasets, ...urlPapers];
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
      setDialogInfo('Categorías del modelo', 'Debe seleccionar al menos una categoría relacionada con el modelo', false);
      return;
    }
  
    if (accuracy === 0 || accuracy === -1 || isNaChecked) {
      setDialogInfo("Precisión del modelo", "Asegúrese de que los parámetros indicados son correctos.", false);
      return;
    }
  
    try {
      await updateModel();
      setDialogInfo("Modelo actualizado exitosamente", "El modelo ha sido actualizado exitosamente.", true);
    } catch (e) {
      setDialogInfo("Algo salió mal", "Hubo un error al actualizar el modelo. Inténtelo de nuevo más tarde.", false);
    }
    return;
  };
  
  const updateModel = async () => {
    try {
      const finalAccuracy = isNaChecked ? -1.0 : accuracy;
      const finalDatasets = urlDatasets !== originalDatasets ? urlDatasets : [];
      const finalPapers = urlPapers !== originalPapers ? urlPapers : [];
      const finalCategories = selectedCategoryOptions !== originalCategories ? selectedCategoryOptions : [];
      const modelDetails = {
        model_name: modelName,
        small_description: smallDescription,
        large_description: largeDescription,
        accuracy: finalAccuracy,
        url_colab: urlColab,
        url_datasets: finalDatasets,
        url_papers: finalPapers,
        categories: finalCategories,
        version,
        privated,
      };
  
      await updatemodel(MODEL_ID, modelDetails);
      setUpdated(true);
    } catch (error: any) {
      throw new Error(`Error actualizando el modelo: ${error.message || error}`);
    }
  }; 

  const handleCategoryChange = (_event: any, newValue: React.SetStateAction<Category[]>) => {
    setSelectedCategoryOptions(newValue);
  };

  const handleNaChecked = (e: { target: { checked: any; }; }) => {
    const checked = e.target.checked;

    setIsNaChecked(checked);
    setSuccess(false);

    if (checked) {
      setPreviousAccuracy(accuracy);
    } else {
      setAccuracy(previousAccuracy);
    }
  };

  const handleAddDatasetUrl = () => {
    setUrlDatasets([...urlDatasets, '']);
  };

  const handleRemoveDatasetUrl = (index: number) => {
    const newUrls = urlDatasets.filter((_, i) => i !== index);
    setUrlDatasets(newUrls);
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

  const handleAccuracyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(value==='' || isNaChecked){
      setAccuracy(-1);
      return;
    }
    const regex = /^\d+(\.\d{0,1})?$/;
    if (regex.test(value)) {
      const parsedValue = parseFloat(value);
      if (parsedValue >= 0 && parsedValue <= 100) {
        setAccuracy(parsedValue);
      }
    }
  };
  
  const handleCancel = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  const handleClose = () => {
    setOpenDialog(false);
    if(dialogTitle === 'Precisión del modelo')
      setSuccess(true);
    if(updated)
      navigate('/account')
  };

  return (
    <>
      <Box margin={'100px auto auto auto'}>
        <Typography textAlign={'center'} variant='h3' marginBottom={'40px'}>
          Actualizar Modelo
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
                label="Nombre del modelo"
                name="modelName"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoFocus
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                label="Descripción corta"
                name="smallDescription"
                helperText='Introducción corta del modelo'
                value={smallDescription}
                onChange={(e) => setSmallDescription(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 1000 }}
              />
              <TextField
                label="Descripción larga"
                name="largeDescription"
                helperText='Descripción detallada del modelo. Incluya guía de uso, políticas y legalidades referentes al modelo'
                value={largeDescription}
                onChange={(e) => setLargeDescription(e.target.value)}
                fullWidth
                multiline
                rows={6}
                margin="normal"
                required
                inputProps={{ maxLength: 3000 }}
              />
              <Tooltip title={"Por favor, siga el formato indicado en el ejemplo"}>
                <TextField
                  label="Versión"
                  value={version} 
                  onChange={handleVersionChange}
                  fullWidth
                  margin="normal"
                  required
                  helperText='Versión del modelo. Ejemplo: "1.0.0"'
                  inputProps={{ maxLength: 10 }} 
                />
              </Tooltip>
              <Tooltip title={"Si el modelo es privado, no estará disponible para otros usuarios"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!privated} // Debe ser lo opuesto a lo almacenado en DB para indicar si el modelo es público o no
                      onChange={(e) => setPrivated(!e.target.checked)}
                      color="primary"
                    />
                  }
                  label={privated ? "Privado" : "Público"} 
                />
              </Tooltip>
              <FormHelperText>
                Condición del modelo
              </FormHelperText>
            </Box>
            <Divider variant='middle' flexItem orientation='vertical' sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Divider flexItem sx={{ display: { xs: 'flex', md: 'none' }, margin: '20px 50px' }} />
            <Box sx={{ width: { xs: '80%', md: '40%' } }} margin={'auto'}>
              <Typography variant='h4' textAlign={'center'} noWrap>
                Información Técnica
              </Typography>
              <Tooltip title="Si para su modelo no aplican las mediciones de precisión, por favor indíquelo en la casilla N/A" arrow>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Accuracy %"
                    helperText="Precisión del modelo"
                    name="precision"
                    type='number'
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                    value={accuracy === -1 ? '' : accuracy}
                    onChange={handleAccuracyChange}
                    margin="normal"
                    sx={{ width: '50%', marginRight: '10px' }}
                    required
                    disabled={isNaChecked}
                  />
                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={isNaChecked}
                      onChange={handleNaChecked}
                    />
                  }
                  label="N/A"
                />
                </Box>
              </Tooltip>
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
                    helperText="Seleccione una o varias categorías para el modelo"
                    placeholder="Elija..."
                  />
                )}
              />
              <TextField
                label="Código"
                helperText="URL del Google Colab"
                value={urlColab}
                onChange={(e) => setUrlColab(e.target.value)}
                fullWidth
                margin="normal"
                required
                inputProps={{ maxLength: 200 }}
              />
              <Box>
                {urlDatasets.map((url, index) => (
                  <Box key={index} display="flex" alignItems="center" marginY={1}>
                    <TextField
                      label={"Dataset"}
                      helperText={`URL del dataset ${index + 1}`}
                      value={url}
                      onChange={(e) => {
                        const newUrls = [...urlDatasets];
                        newUrls[index] = e.target.value;
                        setUrlDatasets(newUrls);
                      }}
                      fullWidth
                      margin="normal"
                      required
                      inputProps={{ maxLength: 200 }}
                    />
                    {urlDatasets.length > 1 && (
                      <Tooltip title="Remover URL de dataset" arrow>
                        <Button
                          onClick={() => handleRemoveDatasetUrl(index)}
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
                <Tooltip title="Agregar URL de dataset" arrow>
                  <Button
                    onClick={handleAddDatasetUrl}
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

export default FormModelUpdate;
