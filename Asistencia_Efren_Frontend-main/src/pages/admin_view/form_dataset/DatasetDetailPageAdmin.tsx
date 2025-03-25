import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../context/UserContext/API';
import LinkIcon from '@mui/icons-material/Link';
import { Box, Typography, Button, Tabs, Tab, Chip, styled, Rating, FormControl, InputLabel, Select, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, TextField, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteComment, fetchComments, submitComment } from './helpers/getdatasets';
import { UserContext } from '../../../context/UserContext/UserContext';
import { Close as CloseIcon } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CalificationSelector from '../../model_information/components/CalificationSelector';


interface Dataset {
    user: any;
    id: number;
    dataset_name: string;
    autor?: string;
    score: string;
    publish_date: string;
    description?: string;
    url_source: string;
    papers: string[];
    categories: Category[];
    version: Array<string>;
    status: string;
    privated: boolean;
}

interface Category {
    categories_name: string;
}

interface Comment {
    comment: string;
    user: any;
    id: number;
    id_model: number;
    id_user: number;
    content: string;
    username: string;
}

const DatasetDetailPageAdmin = () => {
    const { id } = useParams();
    const DATASET_ID = Number(id);
    const [dataset, setDataset] = useState<Dataset | null>();
    const [tabValue, setTabValue] = React.useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const ContxValues = useContext(UserContext);
    const USER_ID = Number(ContxValues?.user?.id);

    useEffect(() => {
        const fetchDatasetData = async () => {
            try {
                const response = await api.get(`/datasets/withUser/${DATASET_ID}`);
                if (response.data.success){
                    setDataset(response.data.dataset);
                    setCategories(response.data.dataset.categories || [])
                }else{
                    setError(response.data.message)
                }
                const fetchedComments = await fetchComments(DATASET_ID);
                setComments(fetchedComments);
            } catch (err: any) {
                setError(err.message || 'Error fetching dataset data');
            }finally{
                setLoading(false);
            }
        };

        fetchDatasetData();
    }, [id]);

    const handleUpdate = async (status: string) => {
        try {
            await api.put(`/datasets/${DATASET_ID}`, {
                status: status,
            });
    
            const messageText = status === 'Accepted' ? 'Aceptado' : 'Rechazado';
    
            await Swal.fire({
                title: 'Actualización exitosa',
                text: `El estado ha sido actualizado a "${messageText}".`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                iconColor: status === 'Rejected' ? '#dc3545' : '#28a745', 
            });
    
            navigate('/datasets_management/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al actualizar el estado.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank');
    };

    const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; 

        try {
            const result = await submitComment(DATASET_ID, USER_ID, newComment);
            if (result.success) {
                const updatedComments = await fetchComments(DATASET_ID);
                setComments(updatedComments);
                setNewComment('');
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    async function handleDeleteComment(id: number) {
        try {
            await deleteComment(id);
    
            const updatedComments = await fetchComments(DATASET_ID); 
            setComments(updatedComments);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    const StyledRating = styled(Rating)( {
        '& .MuiRating-iconFilled': {
            color: '#246724',
        },
        '& .MuiRating-iconHover': {
            color: '#246724',
        },
    });
    
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return  <Typography color="error">{error}</Typography>;
    if (!dataset) return  <Typography>No dataset data found</Typography>;

    return (
        <>
            <Box sx={{ padding: '50px 0px 0px 0px' }}>
                <Box margin="20px auto" width="70%" display="flex" flexWrap="wrap" position="relative">
                    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                        <Typography variant="h3" component="p" textAlign="left" gutterBottom>
                            {dataset.dataset_name}
                        </Typography>
                        <Typography variant="caption" component="p" textAlign="left" margin="0 0 20px 30px">
                            By {dataset.user ? dataset.user.fullname : 'No especificado'} ({dataset.publish_date})
                        </Typography>
                        <Typography variant="body1" component="p" fontSize={18} sx={{ textAlign: 'justify' }}>
                            {dataset.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 800, margin: '20px auto', display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button 
                    variant="contained" 
                    onClick={() => { handleUpdate('Accepted') }}
                    sx={{ 
                        backgroundColor: 'green', 
                        color: 'white', 
                        '&:hover': {
                            backgroundColor: 'green', 
                            transform: 'scale(1.05)', 
                        } 
                    }}>
                        Aceptar
                </Button>
                <Button 
                    variant="contained" 
                    onClick={() => { handleUpdate('Rejected') }}
                    sx={{ 
                        backgroundColor: 'red', 
                        color: 'white', 
                        '&:hover': {
                            backgroundColor: 'red', 
                            transform: 'scale(1.05)',
                        } 
                    }}>
                        Rechazar
                </Button>
            </Box>

            <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                <Tabs value={tabValue} onChange={handleChange} centered>
                    <Tab label="Información" />
                    <Tab label="Códigos" />
                    <Tab label="Calificación" />
                    <Tab label="Comentarios" />
                </Tabs>
                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                            <Typography variant="h6">
                                Autor: {dataset.user ? dataset.user.fullname : 'No especificado'}
                            </Typography>
                            <FormControl sx={{ minWidth: 120}} size="small">
                                <InputLabel id="version-select-label">Versión</InputLabel>
                                <Select
                                    labelId="version-select-label"
                                    id="version-select"
                                    value={dataset.version}
                                    label="Versión"
                                    displayEmpty
                                >
                                    <MenuItem value={dataset.version}>{dataset.version}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Typography paragraph><strong>Fecha de publicación:</strong> {dataset.publish_date}</Typography>
                        <Box display="flex" alignItems="center" mb="16px">
                            <Typography paragraph marginY="auto"><strong>Categorías:</strong></Typography>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <Chip
                                        label={category.categories_name}
                                        key={category.categories_name}
                                        sx={{ margin: 'auto 10px' }}
                                    />
                                ))
                            ) : (
                                <Typography fontStyle="italic" ml={1}>
                                    <strong>*Sin categorías asignadas*</strong>
                                </Typography>
                            )}
                        </Box>
                        <Typography paragraph>
                            <strong>Condición:</strong> {dataset.privated ? 'Privado' : 'Público'}
                        </Typography>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Código</Typography>
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
                                        <TableCell sx={{ wordBreak: 'break-word' }}>{dataset.url_source}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Abrir enlace del Código">
                                                <Button 
                                                    startIcon={<LinkIcon />} 
                                                    onClick={() => handleLinkClick(dataset.url_source)}
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

                        {dataset.papers.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ mb: 1 }}>Papers</Typography>
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
                                                <TableCell sx={{ wordBreak: 'break-word' }}>{dataset.papers[0]}</TableCell>
                                                <TableCell>
                                                    <Tooltip title="Abrir enlace del Paper">
                                                        <Button 
                                                            startIcon={<LinkIcon />} 
                                                            onClick={() => handleLinkClick(dataset.papers[0])}
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
                                            {dataset.papers.slice(1).map((url, index) => (
                                                <TableRow key={index}>
                                                    <TableCell sx={{ wordBreak: 'break-word' }}>{url}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Abrir enlace del Paper">
                                                            <Button 
                                                                startIcon={<LinkIcon />} 
                                                                onClick={() => handleLinkClick(url)}
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
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </Box>
                )}
                {tabValue === 2 && (
                    <Box 
                        width="20%" 
                        margin="20px auto"
                        p={2} 
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        textAlign="center">
                        <Typography variant="body2" marginTop="20px">
                            Calificación global
                            <StyledRating
                                name="customized-color"
                                defaultValue={parseFloat(dataset.score)}
                                precision={0.5}
                                icon={<CircleIcon fontSize="inherit" />}
                                emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
                                max={10}
                                readOnly
                            />
                        </Typography>
                        <Typography variant="body2" component="div" marginTop="20px">
                            Califícame aquí
                            <CalificationSelector />
                        </Typography>
                    </Box>
                )}
                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Grid item xs={12} key={comment.id} sx={{ display: 'flex' }}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                border: '1px solid #ddd',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                minWidth: 'auto',
                                                maxWidth: '100%',
                                                wordWrap: 'break-word',
                                                backgroundColor: '#f9f9f9',
                                                width: 'fit-content',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" color="textSecondary" sx={{mr:1}}>
                                                    {comment.user.fullname}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    sx={{
                                                        color: 'gray',
                                                        '&:hover': {
                                                            color: 'red',
                                                        },
                                                    }}
                                                >
                                                <Tooltip title={"Borrar"}>
                                                    <CloseIcon sx={{ fontSize: '15px' }} />
                                                </Tooltip>
                                                </IconButton>
                                            </Box>
                                            <Typography>{comment.comment}</Typography>
                                        </Box>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ gridColumn: 'span 12' }}>
                                    -- No hay comentarios --
                                </Typography>
                            )}
                        </Grid>
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                label="Nuevo Comentario"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={newComment}
                                onChange={handleNewCommentChange}
                                inputProps={{ maxLength: 500 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCommentSubmit}
                                sx={{ mt: 2 }}
                            >
                                Enviar
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default DatasetDetailPageAdmin;