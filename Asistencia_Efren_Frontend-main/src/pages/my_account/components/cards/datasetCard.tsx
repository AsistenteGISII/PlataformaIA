import { Box, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AverageCalification from "../../../model_information/components/AverageCalification";
import { useNavigate } from 'react-router-dom';

type DatasetCardProps = {
    id: number,
    dataset_name: string,
    description: string,
    score: string,
    status: string,
    privated:boolean,
}

export const DatasetCard = ({ id, dataset_name, score, description,status,privated }: DatasetCardProps) => {
    const navigate = useNavigate();

    function verDataset() {
        navigate(`../datasets/${id}`);
    }

    function editarDataset(event: React.MouseEvent) {
        event.stopPropagation();
        navigate(`/datasets/update/${id}`);
    }
    
    return (
        <Box 
            onClick={() => verDataset()} 
            sx={{
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'space-between',
                width: '20rem',
                height: '20rem',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                '&:hover': {
                    transform: 'scale(1.05)', 
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', 
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <Typography variant="h5" component="div">
                    {dataset_name}
                </Typography>
                <Tooltip title="Editar dataset">
                    <IconButton onClick={editarDataset} sx={{ color: '#6b7280' }}>
                        <BorderColorIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                border: 'none', 
                boxShadow: 'none',
            }}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        <span>Estado: </span>
                        <span
                            style={{
                                color:
                                    status === 'Accepted'
                                        ? 'inherit' 
                                        : status === 'Rejected'
                                        ? '#D52E10' 
                                        : '#d58910',
                            }}
                        >
                            {status === 'Pending' ? 'Pendiente' : status === 'Accepted' ? 'Aceptado' : 'Denegado'}
                        </span>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Condición: {privated ? 'Privado' : 'Público'}
                    </Typography>
                    <Box marginTop={"20px"} textAlign={"center"}>
                        <Typography variant="body2" component="p" marginBottom={"5px"}>
                            Calificación
                        </Typography>
                        <AverageCalification grade={score.toString()} />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
    
}