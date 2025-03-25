import { Box, Button, Typography } from "@mui/material";
import { styles } from "../helpers/CardStyles";
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

export default function ModelsCard() {
    return(
        <Box sx={styles}>
            <Box borderRadius={'20px 20px 0 0'}>
            <PsychologyOutlinedIcon
                sx={{
                    color:"#60DBFF", 
                    marginTop:'2.5vh',
                    fontSize: 110,
                    filter: 'brightness(1)', 
                    '& path': {
                        strokeWidth: 1, // Ancho de las líneas del icono
                    },
                }}
                />
        </Box>
            <Box p={'0 20px 10px 20px'}>
                <Typography color={'white'}  fontFamily={'monospace'} fontSize={'1.8rem'} variant="h2" mt={'20px'}>
                    <b>Modelos</b>
                </Typography>          
                <Typography color={'white'} mt={'15px'} textAlign={'center'} fontFamily={'Roboto'} fontSize={'1.2rem'} variant="body1">
                    Explora nuestra extensa colección de modelos de inteligencia artificial diseñados para abordar una variedad de desafíos en campos que van desde el reconocimiento facial hasta la visión por computadora. 
                    Todo lo que necesitas para llevar tus proyectos al siguiente nivel.
                </Typography>
            </Box>
            
        </Box>
    );
}