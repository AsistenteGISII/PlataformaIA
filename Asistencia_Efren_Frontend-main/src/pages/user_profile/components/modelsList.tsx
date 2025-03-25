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
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import api from '../../../context/UserContext/API';


interface MyComponentProps {
    idUser: string;
}
interface Model {
    id: number;
    model_name: string;
    imageUrl: string;
    publish_date: string;
    accuracy: number;
    score: number;
};

const ModelListPage = ({ idUser }: MyComponentProps) => {
    const [models, setModels] = useState<Model[]>([]);
    const [filteredData, setFilteredData] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await api.get(`/relationshipModel/${idUser}`)
                if (res.data.user === null || res.data.user.length === 0) {
                    setLoading(false);
                    setNoData(true);
                    setModels([]);
                    return;
                }

                setNoData(false);
                setModels(res.data.user.models);
                setFilteredData(res.data.user.models);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData()
    }, []);

    useEffect(() => {
        if (!loading) {
            setFilteredData(models.filter((item: Model) =>
                item.model_name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, models, loading]);

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
                    <Typography>Este usuario no ha publicado modelos</Typography>
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
                        {filteredData.map((model: Model) => (
                            <Card key={model.id} style={{ marginBottom: '20px', minWidth: '300px', maxWidth: '800px' }}>
                                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                                            <Box style={{ width: '60px', height: '60px', marginRight: '20px', borderRadius: '50%', backgroundColor: '#05254A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <PsychologyOutlinedIcon style={{ fontSize: 40, color: 'white' }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">{model.model_name}</Typography>
                                                <Typography variant="body2">{model.publish_date}</Typography>
                                                <Typography variant="body2">Precisión: {model.accuracy}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                                        <Box style={{ borderRadius: '50%', border: '2px solid green', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography>{model.score}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ModelListPage;