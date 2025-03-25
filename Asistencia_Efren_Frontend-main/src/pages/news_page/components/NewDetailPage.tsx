import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../context/UserContext/API';
import { Box, Typography, Button, CircularProgress, Tabs, Tab, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Tooltip } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

interface New {
    user: any;
    id: number;
    news_name: string;
    autor?: string;
    small_description: string;
    large_description: string;
    score: string;
    publish_date: string;
    url_new: string;
    version: Array<string>;
    status: string;
    cont_views: number;
}

const NewDetailPageAdmin = () => {
    const { id } = useParams();
    const [news, setNews] = useState<New>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get(`/news/withUser/${id}`);console.log(response)
                setNews(response.data)

                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Error fetching news:", err.message);
                    setError(err.message);
                } else {
                    // Maneja el caso donde el error no es una instancia de Error
                    console.error("An unexpected error occurred:", err);
                    setError("An unexpected error occurred");
                }
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank');
    };

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;
    if (!news) return <p>No news found</p>;

    return (
        <>
            <div className="container_acctions" style={{ padding: '50px 0px 0px 0px' }}>
                <Box margin="20px auto" width="70%" display={"flex"} flexWrap={"wrap"} position="relative">
                    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                        <Typography variant="h3" component="p" textAlign="left" gutterBottom>
                            {news.news_name}
                        </Typography>
                        <Typography variant="caption" component="p" textAlign={"left"} margin={"0 0 20px 30px"}>
                            By {news.user ? news.user.fullname : 'No especificado'} ({news.publish_date})
                        </Typography>
                        <Typography variant="body1" component="p" fontSize={18} textAlign={"justify"}>
                            {news.small_description}
                        </Typography>
                    </Box>
                </Box>
            </div>
            <div className="container_data">
                <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                    <Tabs value={tabValue} onChange={handleChange} centered>
                        <Tab label="Información" />
                        <Tab label="Enlaces" />
                    </Tabs>
                    {tabValue === 0 && (
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{mb:2}}>Autor: {news.user ? news.user.fullname : 'No especificado'}</Typography>
                            <Typography paragraph>Fecha de publicación: {news.publish_date}</Typography>
                            <Typography paragraph>Descripción: {news.large_description}</Typography>
                            <Typography paragraph>Vistas: {news.cont_views}</Typography>
                        </Box>
                    )}
                    {tabValue === 1 && (
                        <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Noticia completa</Typography>
                        <TableContainer component={Paper} sx={{ mb: 3 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '85%', wordBreak: 'break-word' }}>URL</TableCell>
                                        <TableCell sx={{ width: '15%' }}>Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ wordBreak: 'break-word' }}>{news.url_new}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Abrir enlace ">
                                                <Button 
                                                    startIcon={<LinkIcon />} 
                                                    onClick={() => handleLinkClick(news.url_new)}
                                                    sx={{
                                                        '&:hover': {
                                                            transform: 'scale(1.05)',
                                                        } 
                                                    }}
                                                >
                                                    Abrir
                                                </Button>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    )}
                </Box>
            </div>

        </>
    );
};

export default NewDetailPageAdmin;