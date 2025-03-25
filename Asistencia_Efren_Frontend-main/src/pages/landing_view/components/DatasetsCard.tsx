import { Box, ButtonBase, Typography } from "@mui/material";
import { styles } from "../helpers/CardStyles";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

export default function DatasetsCard() {
    return(
        <Box sx={styles}>
            <Box borderRadius={'20px 20px 0 0'}>
            <TableChartOutlinedIcon
                sx={{
                    color:"#60DBFF", 
                    marginTop:'2.5vh',
                    fontSize: 110, // Tamaño del icono
                    filter: 'brightness(1)', 
                    '& path': {
                        strokeWidth: 2, // Ancho de las líneas del icono
                    },
                }}
                />
            </Box>
            <Box p={'0 20px 10px 20px'}>
                <Typography color={'white'} fontFamily={'monospace'} fontSize={'1.8rem'} variant="h2" mt={'20px'}>
                    <b>Datasets</b>
                </Typography>          
                <Typography color={'white'} mt={'15px'} textAlign={'center'} fontFamily={'Roboto'} fontSize={'1.2rem'} variant="body1">
                    Sumérgete en un mar de datos con nuestra selección de conjuntos de datos. 
                    Desde conjuntos estándar hasta colecciones especializadas, encontrarás recursos para alimentar tus algoritmos y ayudarte a construir modelos más precisos y robustos.
                </Typography>                
            </Box>

        </Box>
    );
}