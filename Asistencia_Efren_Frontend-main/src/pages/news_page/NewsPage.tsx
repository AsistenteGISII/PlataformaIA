import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Grid } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";
import api from "../../context/UserContext/API";

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

export default function NewsPage() {

    const [data, setData] = useState<New[]>([]);
    const [filteredData, setFilteredData] = useState<New[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getNewData = async () => {
            try {
                setLoading(true);
                // Get news data
                const res = await api.get(`/news`);
                const acceptedNews = res.data.filter((item: { status: string; privated: boolean }) => item.status === "Accepted" && !item.privated);

                // Get relationships
                const relation = await api.get(`/relationshipNew/`);
                const relations = relation.data;

                // Get user data based on relations
                const userIds = relations.map((rel: { id_user: any; }) => rel.id_user);
                const uniqueUserIds = [...new Set(userIds)];
                const userPromises = uniqueUserIds.map(id => api.get(`/users/${id}`));
                const usersResponse = await Promise.all(userPromises);
                const users = usersResponse.map(res => res.data);

                // Assign users to each news item
                const newsWithUsers = acceptedNews.map((item: { id: any; }) => {
                    const relation = relations.find((rel: { id_new: any; }) => rel.id_new === item.id);
                    const user = users.find(user => user.id === relation?.id_user);
                    return { ...item, user };
                });

                setData(newsWithUsers);
                setFilteredData(newsWithUsers);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };
        getNewData();
    }, []);

    useEffect(() => {
        if (!loading) {
            const filteredNews = data.filter(item =>
                (item.news_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filteredNews);
        }
    }, [searchTerm, data, loading]);

    const handleCardClick = (id: number) => {
        navigate(`/news/${id}`);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="10px 150px"
                marginTop="calc(64px + 10px)" 
            >
                <Box display="flex" alignItems="center" border={"1px solid lightgray"} borderRadius={"5px"} padding={"5px"}>
                    <NewspaperIcon sx={{ margin: "auto 0" }} />
                    <Typography variant='h5' style={{ marginLeft: "10px" }}>News</Typography>
                </Box>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" padding="10px 150px">
                <TextField
                    label="Buscar Noticia"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                        style: { borderRadius: '15px', width: '400px' }
                    }}
                />
            </Box>

            <Grid container spacing={3} justifyContent="center" padding="10px 150px">
                {filteredData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card onClick={() => handleCardClick(item.id)} sx={{ cursor: 'pointer', width: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" marginBottom="10px">
                                    {item.news_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    Autor: {item.user ? item.user.fullname : 'No especificado'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    Fecha: {item.publish_date}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginBottom="5px">
                                    Vistas: {item.cont_views}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <SpeedDialFAQS />
        </>
    );
}
