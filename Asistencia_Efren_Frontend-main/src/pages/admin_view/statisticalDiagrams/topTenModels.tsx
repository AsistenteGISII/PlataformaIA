import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Container, Card, CardContent, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Rating } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import api from '../../../context/UserContext/API';

interface Model {
    id: number;
    model_name: string;
    publish_date: string;
    small_description: string;
    large_description: string;
    score: number;
    accuracy: number;
    url_colab: string;
    url_dataset: string;
    url_paper: string;
    version: string;
    privated: boolean;
    cont_views: number;
    status: string;
}

export const TopTenModels = () => {
    const [data, setData] = useState<Model[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));


    useEffect(() => {
        const getTopTen = async () => {
            try {
                const res = await api.get<Model[]>(`/models/topModels`);

                if (res.data.length === 0) {
                    setNoData(true);
                    setData([]);
                    return;
                }

                setNoData(false);
                setData(res.data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setNoData(true);
            }
        };

        getTopTen();
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom textAlign={'center'} color={'#D57D20'} fontStyle={'blod'}>
                Top de los 10 modelos mejor calificados
            </Typography>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : noData ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="50vh"
                    color={'#1A73D7'}
                >
                    <Typography>No hay registros de modelos</Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        height: isSmallScreen ? 350 : 458,
                        overflow: 'auto',
                        marginBottom: '20px',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}
                >
                    <List>
                        {data.map((data, index) => (
                            <Card key={data.id} variant="outlined"
                                sx={{
                                    marginBottom: '20px',
                                    borderRadius: '30px'
                                }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2} container justifyContent="center" alignItems="center">
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: index === 0 ? '#FFD700' : 'default',
                                                        color: index === 0 ? 'white' : 'default',
                                                        width: isSmallScreen ? 50 : 70,
                                                        height: isSmallScreen ? 50 : 70,
                                                        margin: isSmallScreen ? 1 : 0,
                                                        borderRadius: '50%'
                                                    }}
                                                >
                                                    <EmojiEventsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <ListItemText
                                                primary={<Typography variant="h6"
                                                    sx={{
                                                        fontSize: {
                                                            xs: '1rem', // Tamaño para pantallas pequeñas
                                                            sm: '1.25rem', // Tamaño para pantallas medianas
                                                            md: '1.5rem', // Tamaño para pantallas grandes
                                                        },
                                                    }}>
                                                    {data.model_name}</Typography>}
                                                secondary={<Typography variant="body2"
                                                    sx={{
                                                        display: isSmallScreen ? 'none' : 'block'
                                                    }}>
                                                    {data.small_description}</Typography>}
                                            />
                                            <Rating value={data.score} readOnly max={10}
                                                sx={{
                                                    '& .MuiRating-icon': {
                                                        fontSize: '20px', // Ajusta este valor según el tamaño deseado
                                                    },
                                                }} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};