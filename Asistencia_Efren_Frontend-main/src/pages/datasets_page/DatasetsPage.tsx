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
import { Dataset } from './helpers/validations';
import { fetchTopDatasetsByCategory, fetchTopDatasetsByViews } from './helpers/getdatasets';

export default function DatasetsPage() {
    const [trendingDatasets, setTrendingDatasets] = useState<Dataset[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<{ category: string; category_id:Number; datasets: Dataset[] } []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const navigate = useNavigate();
    const ContxValues = useContext(UserContext);
    const USER_ID = Number(ContxValues?.user?.id);

    useEffect(() => {
        window.scrollTo(0, 0); 
        const getDatasetData = async () => {
            try {
                setLoading(true);
                const topDatasets = await fetchTopDatasetsByCategory();
                const trendingDatasets = await fetchTopDatasetsByViews();
                setTrendingDatasets(trendingDatasets.data);
                setGroupedCategories(topDatasets);
            } catch (error) {
                console.error('Error fetching datasets:', error);
            } finally {
                setLoading(false);
            }
        };
        getDatasetData();
    }, []);

    const handleCardClick = (id: number) => {
        navigate(`/datasets/${id}`);
    };

    const shouldBeInfinite = trendingDatasets.length > 1;
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
            navigate('/datasets/create');
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
                <TrendingUpIcon sx={{ margin: "auto 0" }}></TrendingUpIcon>
                <Typography marginLeft={"10px"} variant='h5'>Trending datasets</Typography>
            </Box>
            <Box className="container_trending">
                <Slider {...settings}>
                {trendingDatasets.map((dataset, index) => (
                    <Box key={index}>
                        <Card className="card-slider" onClick={() => handleCardClick(dataset.id)} sx={{ width: 350, cursor:'pointer' }}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
                                <b>{dataset.dataset_name}</b>
                            </Typography>
                            <Box display="flex">
                                <Box maxWidth="65%">
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    <b>Autor: </b>{dataset.user ? dataset.user[0].fullname : 'No especificado'}
                                </Typography>
                                </Box>
                                <Box marginLeft="30px">
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    <b>Fecha: </b>{dataset.publish_date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    <b>Vistas: </b>{dataset.cont_views}
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
                    <Typography variant='h5' style={{ marginLeft: "10px" }}>Datasets</Typography>
                </Box>
                
                <Button onClick={handlePublishClick} variant="contained" sx={{ marginLeft: "10px" }}>Publicar</Button>
            </Box>
            <Box padding={"10px 150px"}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    groupedCategories
                        .filter(({ datasets }) => datasets.length > 0)
                        .map(({category, category_id, datasets}) => {
                        return (
                          <Box key={category} marginBottom={4}>
                            <Typography variant="h6" gutterBottom>
                              <b>{category}</b>
                            </Typography>
                            <Grid container spacing={2}>
                              {datasets.map((dataset) => (
                                <Grid item xs={12} sm={6} md={4} key={dataset.id}>
                                  <Card 
                                    onClick={() => handleCardClick(dataset.id)} 
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor:'pointer' }} 
                                  >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                      <Typography variant="h5">{dataset.dataset_name}</Typography>
                                      <Typography color="textSecondary">Autor: {dataset.user ? dataset.user[0].fullname : 'No especificado'}</Typography>
                                      <Typography color="textSecondary">Descripción: {dataset.description ? truncateText(dataset.description) : ''}</Typography>
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
                                onClick={() => navigate(`/datasets/category/${category_id}/${category}`)
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