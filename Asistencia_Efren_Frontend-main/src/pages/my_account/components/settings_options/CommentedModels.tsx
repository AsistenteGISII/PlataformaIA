import { Box, Divider, Typography } from "@mui/material";
import { ModelCard } from "./ModelCard";
import { Comment } from "./Comment";

export const CommentedModels = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px">
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{ borderRadius: { xs: '30px 30px 0 0', md: '0 30px 0 0' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Modelos comentados
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap" textAlign={"left"} margin={"auto"}
                sx={{
                    height: 505,
                    maxHeightheight: 510, 
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}>
                <Box>
                    <Box margin={"auto"}>
                        <ModelCard
                            autor='Fabricio Alvarado Alvarado'
                            modelName='Reconocimiento de personas'
                            grade='9.7'
                            precision='95'
                        />
                    </Box>
                    <Box margin={"auto"}>
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"Excelente modelo"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"¿Saben si funciona con un dataset propio?"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"La estructura es muy robusta, soporta datasets complicados y con una muy buena precision"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                    </Box>
                </Box>
                <Box>
                    <Box margin={"auto"}>
                        <ModelCard
                            autor='Fabricio Alvarado Alvarado'
                            modelName='Reconocimiento de personas'
                            grade='9.7'
                            precision='95'
                        />
                    </Box>
                    <Box margin={"auto"}>
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"Excelente modelo"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"¿Saben si funciona con un dataset propio?"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"La estructura es muy robusta, soporta datasets complicados y con una muy buena precision"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                    </Box>
                </Box>
                <Box>
                    <Box margin={"auto"}>
                        <ModelCard
                            autor='Fabricio Alvarado Alvarado'
                            modelName='Reconocimiento de personas'
                            grade='9.7'
                            precision='95'
                        />
                    </Box>
                    <Box margin={"auto"}>
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"Excelente modelo"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"¿Saben si funciona con un dataset propio?"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                        <Comment autor={"Fabricio Alvarado Alvarado"} description={"La estructura es muy robusta, soporta datasets complicados y con una muy buena precision"} date={"15/06/2023"} funtionParent={() => { return false; }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}