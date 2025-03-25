import { Box, Typography } from "@mui/material";
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { styles } from "../helpers/CardStyles";


export default function NewsCard() {
    return (
        <Box sx={styles}>
            <Box borderRadius={'20px 20px 0 0'}>
                <NewspaperOutlinedIcon
                    sx={{
                        color: "#60DBFF",
                        marginTop: '2.5vh',
                        fontSize: 110,
                        filter: 'brightness(1)',
                        '& path': {
                            strokeWidth: 1, // Ancho de las líneas del icono
                        },
                    }}
                />
            </Box>
            <Box p={'0 20px 10px 20px'}>
                <Typography mt={'20px'} color={'white'} fontFamily={'monospace'} fontSize={'1.8rem'} variant="h2">
                    <b>Noticias</b>
                </Typography>
                <Typography color={'white'} mt={'15px'} textAlign={'center'} fontFamily={'Roboto'} fontSize={'1.2rem'} variant="body1">
                    Mantente al día con los últimos desarrollos en el mundo de la inteligencia artificial a través de nuestras noticias. 
                    Desde avances científicos hasta aplicaciones comerciales, te mantendremos informado sobre los desarrollos más emocionantes y relevantes en IA.
                </Typography>
            </Box>

        </Box>
    );
}