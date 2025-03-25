import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../../../context/UserContext/API';


interface MyComponentProps {
    idUser: string;
}
interface Dataset {
    id: number;
    dataset_name: string;
    publish_date: string;
    description: string;
    cont_views: number;
    score: number;
};

const NewsListPage = ({ idUser }: MyComponentProps) => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [filteredData, setFilteredData] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get(`/relationshipDataset/${idUser}`)
                if (res.data.user === null || res.data.user.length === 0) {
                    setLoading(false);
                    setNoData(true);
                    setDatasets([]);
                    return;
                }

                setNoData(false);
                setDatasets(res.data.user.datasets);
                setFilteredData(res.data.user.datasets);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData()
    }, []);

    useEffect(() => {
        if (!loading) {
            setFilteredData(datasets.filter((item: Dataset) =>
                item.dataset_name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, datasets, loading]);

    const truncateText = (text: string, wordLimit = 60) => {
        const words = text.split(" ");
        return words.length > wordLimit 
          ? words.slice(0, wordLimit).join(" ") + "..." 
          : text;
      };

    return (
        <Box>
            <TextField
                style={{ marginTop: '25px' }}
                label="Buscar por Nombre"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                InputProps={{
                    startAdornment: (
                        <SearchIcon />
                    ),
                    style: {
                        borderRadius: '15px',
                        width: isSmallScreen ? 300 : 800,
                        marginBottom: '30px',
                    }
                }}
            />
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : noData ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="50vh"
                    color={'#05254A'}
                >
                    <Typography>Este usuario no ha publicado datasets</Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '400px',
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            width: 0,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,.1)',
                            borderRadius: '10px',
                        },
                        padding: '10px'
                    }}
                >
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        {filteredData.map((dataset: Dataset) => (
                            <Card key={dataset.id} style={{ marginBottom: '20px', minWidth: '300px', maxWidth: '800px' }}>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '60px', marginRight: '20px', borderRadius: '50%', backgroundColor: '#05254A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <TableChartOutlinedIcon style={{ fontSize: 40, color: 'white' }} />
                                            </div>
                                            <Box sx={{ marginRight: '1rem' }}>
                                                <Typography variant="h6">{dataset.dataset_name}</Typography>
                                                <Typography variant="body2">Fecha de publicación: {dataset.publish_date}</Typography>
                                                <Typography variant="body2">Vistas: {dataset.cont_views}</Typography>
                                                <Typography variant="body2" sx={{ textAlign: 'justify' }}>Descripción: {truncateText(dataset.description)}</Typography>
                                            </Box>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Box style={{ borderRadius: '50%', border: '2px solid green', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography>{dataset.score}</Typography>
                                        </Box>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default NewsListPage;