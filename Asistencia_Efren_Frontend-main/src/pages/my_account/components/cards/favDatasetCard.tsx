import { Box, Card, CardContent, Typography, styled } from '@mui/material';
import AverageCalification from "../../../model_information/components/AverageCalification";
import FavoriteIcon from '@mui/icons-material/Favorite';

type DatasetCardProps = {
    datasetName: string,
    autor: string,
    grade: number,
    small_description: string,
    version: number
}

export const FavDatasetCard = ({ datasetName, autor, grade, version, small_description }: DatasetCardProps) => {

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" style={{ marginRight: 10 }}>
                        {datasetName}
                    </Typography>
                    <FavoriteIcon color="secondary" style={{ color: '#D33616' }} />
                </div>
                <Typography variant="subtitle2" color="text.secondary">
                    {autor}
                </Typography>
                <div style={{ margin: '10px 0' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Versión: {version}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {small_description}
                    </Typography>
                </div>
                <Box marginTop={"20px"} textAlign={"center"}>
                    <Typography variant="body2" component="p" marginBottom={"5px"}>
                        Calificación
                    </Typography>
                    <AverageCalification grade={grade.toString()} />
                </Box>
            </CardContent>
        </Card>
    );
}