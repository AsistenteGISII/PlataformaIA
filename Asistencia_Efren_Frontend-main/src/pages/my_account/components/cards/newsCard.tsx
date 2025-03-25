import { Box, Card, CardContent, Typography, styled } from '@mui/material';
import AverageCalification from "../../../model_information/components/AverageCalification";
import VisibilityIcon from '@mui/icons-material/Visibility'; // Importar el icono de vistas


type NewsCardProps = {
    news_name: string;
    publish_date: string;
    score: number;
    cont_views: number;
    small_description: number;
    status: string;
}

export const NewsCard = ({ news_name, publish_date, cont_views, score, small_description, status }: NewsCardProps) => {

    return (
        <Card sx={{
            margin: '20px',
            minWidth: "300px", maxWidth: '300px', height: "fit-content", transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.05)',
                cursor: 'pointer',
            },
        }}>
            <CardContent>
                <Typography variant="h5" component="div" style={{ marginRight: 10 }}>
                    {news_name}
                </Typography>
                <Box style={{ margin: '10px 0px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            {publish_date}
                        </Typography>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="text.secondary" style={{ marginRight: '5px' }}>
                            {cont_views}
                        </Typography>
                        <VisibilityIcon color="action" /> 
                    </Box>
                </Box>
                <Typography variant="subtitle2" color="text.secondary">
                    {small_description}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: (status !== 'Accepted') ? '#D52E10' : 'text.secondary' }}>
                    Estado: {status}
                </Typography>
                <Box marginTop={"20px"} textAlign={"center"}>
                    <Typography variant="body2" component="p" marginBottom={"5px"}>
                        Calificación
                    </Typography>
                    <AverageCalification grade={score.toString()} />
                </Box>
            </CardContent>
        </Card>
    );
}