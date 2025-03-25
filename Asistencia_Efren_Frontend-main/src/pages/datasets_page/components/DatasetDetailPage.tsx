import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Chip, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Tooltip, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import LinkIcon from '@mui/icons-material/Link';
import { Category } from '../helpers/validations';
import { fetchDatasetDataWithUser, updateViewCount, fetchComments, submitComment } from '../helpers/getdatasets';
import { UserContext } from '../../../context/UserContext/UserContext';
import CalificationSelector from '../../model_information/components/CalificationSelector';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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
    version: Array<string>;
    status: string;
    cont_views: number;
    privated: boolean;
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

const DatasetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const DATASET_ID = Number(id);
    const [dataset, setDataset] = useState<Dataset>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = React.useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const ContxValues = useContext(UserContext);
    const USER_ID = Number(ContxValues?.user?.id);

    useEffect(() => {
        const fetchDataset = async () => {
            try {
                const dataset = await fetchDatasetDataWithUser(DATASET_ID);
                setDataset(dataset);
                setCategories(dataset.categories);

                //Actualiza el contador de vistas del dataset
                const newContViews = dataset.cont_views + 1;
                await updateViewCount(DATASET_ID, newContViews);

                const fetchedComments = await fetchComments(DATASET_ID);
                setComments(fetchedComments);

                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Error fetching dataset:", err.message);
                    setError(err.message);
                } else {
                    // Maneja el caso donde el error no es una instancia de Error
                    console.error("An unexpected error occurred:", err);
                    setError("An unexpected error occurred");
                }
                setLoading(false);
            }
        };

        fetchDataset();
    }, [id]);

    const checkUserOwnership = () => {
        if (USER_ID && dataset?.user) {
            return USER_ID === dataset.user.id;
        }
        return false;
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

    if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;
    if (!dataset) return <p>No dataset found</p>;

    const isOwner = checkUserOwnership();

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#246724',
        },
        '& .MuiRating-iconHover': {
            color: '#246724',
        },
    });

    return (
        <>
            <Box sx={{ padding: '50px 0px 0px 0px' }}>
                <Box margin="20px auto" width="70%" display="flex" flexWrap="wrap" position="relative">
                    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                        <Typography variant="h3" component="p" textAlign="left" gutterBottom>
                            {dataset.dataset_name}
                        </Typography>
                        <Typography variant="caption" component="p" textAlign={"left"} margin={"0 0 20px 30px"}>
                            By {dataset.user ? dataset.user.fullname : 'No especificado'} ({dataset.publish_date})
                        </Typography>
                        <Typography variant="body1" component="p" fontSize={18} textAlign={"justify"}>
                            {dataset.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
                <Tabs value={tabValue} onChange={handleChange} centered>
                    <Tab label="Información" />
                    <Tab label="Códigos" />
                    <Tab label="Calificación" />
                    {isOwner && <Tab label="Comentarios" />} 
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
                        <Typography paragraph sx={{ textAlign: 'justify' }}><strong>Descripción:</strong> {dataset.description}</Typography>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Set de datos</Typography>
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
                                            <Tooltip title="Abrir enlace del Dataset">
                                                <Button 
                                                    startIcon={<LinkIcon />} 
                                                    onClick={() => handleLinkClick(dataset.url_source)}
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
                                <TableContainer component={Paper}>
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
                {tabValue === 3 && isOwner && (
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Grid item xs={12} key={comment.id} sx={{ display: 'flex', position: 'relative' }}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                border: '1px solid #ddd',
                                                borderRadius: '12px',
                                                display: 'block',
                                                minWidth: 'auto',
                                                width: 'auto',
                                                maxWidth: '100%',
                                                wordWrap: 'break-word',
                                                backgroundColor: '#f9f9f9',
                                                position: 'relative',
                                            }}
                                        >
                                            <Typography variant="body2" color="textSecondary">
                                                {comment.user.fullname}
                                            </Typography>
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

export default DatasetDetailPage;
