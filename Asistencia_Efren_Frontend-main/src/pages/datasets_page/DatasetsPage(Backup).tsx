//Importaciones de React
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Importaciones de Material-UI
import {
    Box, Card, CardContent, Typography, TextField, Button,
    Autocomplete,
    useMediaQuery
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";
import api from "../../context/UserContext/API";

interface Dataset {
    user: any;
    id: number;
    dataset_name: string;
    autor?: string;
    score: string;
    accuracy: number;
    publish_date: string;
    description?: string;
    url_source: string;
    url_paper: string;
    version: Array<string>;
    status: string;
    cont_views: number;
    category: category[]
}

interface UserData {
    id: number;
    username: string;
    fullname: string;
}

interface RelationData {
    id_user: number;
    id_model: number;
}

interface category {
    id:Number, 
    categories_name:string, 
    visible:boolean
}

export default function DatasetsPage() {

    const [data, setData] = useState<Dataset[]>([]);
    const [filteredData, setFilteredData] = useState<Dataset[]>([]);
    const [trendingDatasets, setTrendingModels] = useState<Dataset[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedOptions, setSelectedOptions] = React.useState<category|null>(null);
    const [categories, setCategories] = React.useState<category[]>([]);
    const URL_CATEGORIES = '/categories/visibleCategories'
    const isMobile = useMediaQuery('(max-width:550px)');
    const navigate = useNavigate();

    useEffect(() => {
        const getModelData = async () => {
            try {
                setLoading(true);
                
                const resCategory = await api.get(`${URL_CATEGORIES}`);
                setCategories(resCategory.data);

                //Obtener los datasets
                const res = await api.get(`/datasets`);
                let acceptedDatasets = res.data.filter((dataset: { status: string; privated: boolean }) => dataset.status === "Accepted" && !dataset.privated);
                
                acceptedDatasets = acceptedDatasets.map((e:{user:any}) => {
                    e.user = e.user[0]
                    return {...e}
                })

                const trendingDatasets = [...acceptedDatasets].sort((a, b) => b.cont_views - a.cont_views).slice(0, 3);

                setData(acceptedDatasets);
                setFilteredData(acceptedDatasets);
                setTrendingModels(trendingDatasets); // Asegúrate de tener este estado definido


            } catch (error) {
                console.error('Error fetching models:', error);
            } finally {
                setLoading(false);
            }
        };
        getModelData();
        const interval = setInterval(getModelData, 100000000); //Intervalo para refrescar la pagina cada 10 segundos
        return () => clearInterval(interval); // Limpia el componente conado se desmonta
    }, []);

    const handleCardClick = (id: number) => {
        console.log("Dataset ID:", id); // Verificar que el ID esté siendo pasado correctamente
        navigate(`/datasets/${id}`); // Asegúrate de que esta ruta esté bien definida en tus configuraciones de rutas
    };

    useEffect(() => {
        if (!loading) {
            filterData(searchTerm, data);
        }
    }, [searchTerm, data, loading, selectedOptions]);

    const filterData = (search: string = searchTerm, datos: Dataset[]=data, categorySelected: category|null = selectedOptions) => {
        let filteredModels = datos;
        console.log("Filtrando: ", filteredModels)
        if(categorySelected){
            filteredModels = filteredModels.filter(dataset =>
                dataset.category.some(c => c.categories_name === categorySelected?.categories_name)
            );            
        }
        filteredModels = filteredModels.filter(dataset =>
            (dataset.dataset_name ?? "").toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(filteredModels);
    }

    const shouldBeInfinite = trendingDatasets.length > 1;
    const settings = {
        dots: true,
        infinite: shouldBeInfinite,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,  // Asegura que el modo centrado está activado
        centerPadding: "0px",  // Reduce o elimina el padding si las tarjetas son demasiado grandes
        adaptiveHeight: false
    };
    // adaptiveHeight: false, // Ajusta la altura automáticamente al contenido de la tarjeta
    //Se cambio porque hay cards mas altas que otras y hace que empiece a cambiar de tamaño 
    // el carrusel lo que desplaza toda la vista y es muy incomodo visualmente cuando solo 
    // hay un elemento

    return (
        <>
            <div className="container_name_trend" style={{display:'flex'}}>
                <Box width={'15%'}></Box>
                <Box margin="80px 0 10px 0" display="flex" border={"1px solid lightgray"} width={"fit-content"} borderRadius={"5px"} padding={"5px"}>
                <TrendingUpIcon sx={{ margin: "auto 0" }}></TrendingUpIcon>
                <Typography marginLeft={"10px"} variant='h5'>Trending datasets</Typography>
                </Box>
            </div>
            <div className="container_trending">
                <Slider {...settings}>
                    {trendingDatasets.map((dataset) => (
                        <div key={dataset.id}>
                            <Card className="card-slider" onClick={() => handleCardClick(dataset.id)} style={{ width: 350 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
                                        <b>{dataset.dataset_name}</b>
                                    </Typography>
                                    <Box display="flex" justifyContent={'space-between'}>
                                        <Box width="48%" >
                                            <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                                <b>Autor: </b>{dataset.user ? dataset.user.fullname : 'No especificado'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                                <b>Valoración: </b> {dataset.score}/10
                                            </Typography>
                                        </Box>
                                        <Box width={'48%'}>
                                            <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                                <b>Fecha: </b>{dataset.publish_date}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                                <b>Vistas: </b>{dataset.cont_views}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                                <b>Categorías: </b>{dataset.category.map((e)=>e.categories_name).join(", ")}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Slider>
            </div>
            <br />
            <br />
            <div className="container_search" style={{ display:'flex', alignItems: 'center', padding:'10px' }}>
                <Box width={'15%'}></Box>
                <Box display={'flex'} justifyContent= 'space-between' width={'70%'}>
                    <Box width={'fit-content'} display="flex" alignItems="center" border={"1px solid lightgray"} borderRadius={"5px"} padding={"5px"}>
                        <PsychologyIcon sx={{ margin: "auto 0" }} />
                        <Typography variant='h5' style={{ marginLeft: "10px" }}>Datasets</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            navigate('/datasets/create');
                        }}  // Ruta para create un nuevo modelo
                    >
                        Publicar
                    </Button>
                </Box>
            </div>
            <Box padding={'10px'} display={isMobile?'block':'flex'} justifyContent={'center'} gap={'10px'}>
                <Autocomplete
                    sx={{width:'250px', margin:isMobile?'auto':0}}
                    options={categories}
                    getOptionLabel={(option) => option.categories_name}
                    value={selectedOptions}
                    onChange={(e, newValue) => setSelectedOptions(newValue)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Filtrar por categoria"                  
                            placeholder="Choose..."
                        />
                    )}
                />
                <Box display={'flex'} mt={isMobile?'20px':0}>
                    <TextField
                        label="Buscar Modelo"
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        sx={{margin:'auto'}}
                        InputProps={{
                            startAdornment: (
                                <SearchIcon />
                            ),
                            // style: { borderRadius: '15px'}
                        }}
                    />                    
                </Box>

            </Box>

            {/* <div className="container_cards" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 150px' }}> */}
            <Box display="flex"
                margin={'auto'}
                justifyContent="space-evenly"
                width="95%"
                flexWrap={'wrap'}
            >
                {filteredData.map((dataset) => (
                    <Card key={dataset.id} onClick={() => handleCardClick(dataset.id)} style={{ margin: 10, width: 350 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
                                <b>{dataset.dataset_name}</b>
                            </Typography>
                            <Box display="flex" justifyContent={'space-between'}>
                                <Box width="48%" >
                                    <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                        <b>Autor: </b>{dataset.user ? dataset.user.fullname : 'No especificado'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                        <b>Valoración: </b> {dataset.score}/10
                                    </Typography>
                                </Box>
                                <Box width={'48%'}>
                                    <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                        <b>Fecha: </b>{dataset.publish_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                        <b>Vistas: </b>{dataset.cont_views}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                        <b>Categorías: </b>{dataset.category.map((e)=>e.categories_name).join(", ")}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {/* </div> */}
            <div className="container_actions">
                <SpeedDialFAQS />
            </div>

        </>
    );
}