import { Box, Button, Typography } from "@mui/material";
import ModelsCard from "./components/ModelsCard";
import DatasetsCard from "./components/DatasetsCard";
import NewsCard from "./components/NewsCard";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";
import { useNavigate } from "react-router-dom";
import imgLanding from "./assets/ai.jpg";
import imgJaveriana from "./assets/Logo-Javeriana.png"
import imgTec from "./assets/Logo-TEC.png"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

export default function Landing() {
    const navigate = useNavigate();
    const ContxValues = useContext(UserContext);
    const USER_ID = Number(ContxValues?.user?.id);

    const handleComenzarClick = () => {
        if (USER_ID) {
            navigate('/models'); 
        } else {
            navigate('/login');
        }
    };

    const style = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 'fit-content', md: '100vh' },
        marginTop: '55px',
    };

    const styleh1 = {
        fontFamily: 'monospace',
        fontSize: { xs: '25px', md: '50px' },
        variant: "h1",
        letterSpacing: '3px',
        color: 'black',
    };

    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 'fit-content' 
            }}>
                <Box sx={{ 
                    width: { xs: '100%', md: '50%' }, 
                    paddingLeft: { xs: '10px', md: '50px' }, 
                    textAlign: 'center'
                }} pt={'100px'}>
                    <Typography sx={styleh1}>
                        <b>Soluciones reales para problemas reales con</b>
                    </Typography>
                    <Typography sx={styleh1}>
                        <b><span style={{ color: '#0288d1' }}>TECNOLOGÍA DE IA</span></b>
                    </Typography>
                    <Box sx={{ width: { xs: '90%', md: '60%' } }} mt={'80px'} mx={'auto'}>
                        <Typography color={'black'} fontFamily={'Roboto'} variant="body1" fontSize='20px' textAlign={'center'}>
                            Mantente actualizado diariamente sobre innovaciones en IA con nuestros modelos, datasets y noticias. Únete para ser parte de esto, empieza a publicar los tuyos y a interactuar con nuestra comunidad.
                        </Typography>
                    </Box>
                    <Box marginBottom={'2vh'} display={'flex'} mt={'60px'} justifyContent={'center'}>
                        <Button variant="outlined" sx={{ color: 'white', backgroundColor:'#0288d1' }} onClick={handleComenzarClick}>
                            Comienza ahora
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }}>
                    <img 
                        src={imgLanding} 
                        alt="Models" 
                        style={{ 
                            maxWidth: '75%',   
                            width: '100%',      
                            height: 'auto', 
                            objectFit: 'contain', 
                            margin: '0 auto',
                        }} 
                    />
                </Box>
            </Box>



            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 0' }}>
                <Box mt={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
                    <Box sx={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
                        <img src={imgTec} alt="Alianza TEC" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
                        <img src={imgJaveriana} alt="Alianza Javeriana" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </Box>
                </Box>
            </Box>

            <Box flexWrap={'wrap'} display={'flex'} mx={'auto'} width={'90%'} justifyContent={'space-between'} alignContent={'center'} paddingBottom={'10vh'}>
                <ModelsCard />
                <DatasetsCard />
                <NewsCard />
            </Box>

            <SpeedDialFAQS />
        </>
    );
}
