import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Box, Card, CardContent, Typography, Button, Grid, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";
import { UserContext } from "../../context/UserContext/UserContext";
import { Model } from './helpers/validations';
import { fetchTopModelsByCategory, fetchTopModelsByViews } from './helpers/getmodels';

export default function ModelsPage() {
  const [trendingModels, setTrendingModels] = useState<Model[]>([]);
  const [groupedCategories, setGroupedCategories] = useState<{ category: string; category_id:Number; models: Model[] } []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const ContxValues = useContext(UserContext);
  const USER_ID = Number(ContxValues?.user?.id);

  useEffect(() => {
    window.scrollTo(0, 0); 
    const getModelData = async () => {
      try {
        setLoading(true);
        const topModels = await fetchTopModelsByCategory();
        const trendingModels = await fetchTopModelsByViews();
        setTrendingModels(trendingModels.data);
        setGroupedCategories(topModels);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getModelData();
    const interval = setInterval(getModelData, 100000000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`/models/${id}`);
  };

  const shouldBeInfinite = trendingModels.length > 1; // Infinito cuando hay más de un elemento
  const settings = {
      dots: true,
      infinite: shouldBeInfinite,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,  
      centerPadding: "0px",  
      adaptiveHeight: false
  };

  const handlePublishClick = () => {
    if (!USER_ID) {
      setOpenDialog(true);
    } else {
      navigate('/models/create');
    }
  };

  const handleCloseDialog = (shouldNavigate: boolean) => {
    setOpenDialog(false);
    if (shouldNavigate) {
      navigate('/login');
    }
  };

  const truncateText = (text: string, wordLimit = 15) => {
    const words = text.split(" ");
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(" ") + "..." 
      : text;
  };

  return (
    <>
      <Box margin="80px 0 10px 150px" display="flex" border={"1px solid lightgray"} width={"fit-content"} borderRadius={"5px"} padding={"5px"}>
        <TrendingUpIcon sx={{ margin: "auto 0" }} />
        <Typography marginLeft={"10px"} variant='h5'>Trending models</Typography>
      </Box>
      <Box className="container_trending">
        <Slider {...settings}>
          {trendingModels.map((model, index) => (
            <Box key={index}>
              <Card className="card-slider" onClick={() => handleCardClick(model.id)} sx={{ width: 350, cursor:'pointer' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
                    <b>{model.model_name}</b>
                  </Typography>
                  <Box display="flex">
                    <Box maxWidth="65%">
                      <Typography variant="body2" color="text.secondary" marginBottom="5px">
                        <b>Autor: </b>{model.user ? model.user[0].fullname : 'No especificado'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" marginBottom="5px">
                        <b>Precisión: </b>{model.accuracy === -1 ? 'N/A' : `${model.accuracy}%`}
                      </Typography>
                    </Box>
                    <Box marginLeft="30px">
                      <Typography variant="body2" color="text.secondary" marginBottom="5px">
                        <b>Fecha: </b>{model.publish_date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" marginBottom="5px">
                        <b>Vistas: </b>{model.cont_views}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="10px 150px" marginTop={2}>
        <Box display="flex" alignItems="center" border={"1px solid lightgray"} borderRadius={"5px"} padding={"5px"}>
          <PsychologyIcon sx={{ margin: "auto 0" }} />
          <Typography variant='h5' sx={{ marginLeft: "10px" }}>Models</Typography>
        </Box>
        <Button onClick={handlePublishClick} variant="contained" sx={{ marginLeft: "10px" }}>Publicar</Button>
      </Box>
      <Box padding={"10px 150px"}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          groupedCategories
            .filter(({ models }) => models.length > 0)
            .map(({category, category_id, models}) => {
            return (
              <Box key={category} marginBottom={4}>
                <Typography variant="h6" gutterBottom>
                  <b>{category}</b>
                </Typography>
                <Grid container spacing={2}>
                  {models.map((model) => (
                    <Grid item xs={12} sm={6} md={4} key={model.id}>
                      <Card 
                        onClick={() => handleCardClick(model.id)} 
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor:'pointer' }} 
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h5">{model.model_name}</Typography>
                          <Typography color="textSecondary">Autor: {model.user ? model.user[0].fullname : 'No especificado'}</Typography>
                          <Typography color="textSecondary">Precisión: {model.accuracy === -1 ? 'N/A' : `${model.accuracy}%`}</Typography>
                          <Typography color="textSecondary">Descripción: {truncateText(model.small_description)}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Button 
                    variant="text" 
                    sx={{ 
                      textTransform: "none",
                      fontStyle: "italic",
                      "&:hover": { backgroundColor: "transparent", boxShadow: "none" } }} 
                    onClick={() => navigate(`/models/category/${category_id}/${category}`)
                    }>
                    ver más
                  </Button>
              </Box>
            );
          })
        )}
      </Box>
      <Dialog open={openDialog}>
        <DialogTitle>Ir a inicio de sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se requiere inciar sesión para acceder a esta funcionalidad.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)}>Cancelar</Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">Iniciar sesión</Button>
        </DialogActions>
      </Dialog>
      <SpeedDialFAQS />
    </>
  );
}
