import { Box, Divider, Typography } from "@mui/material";
import { ModelCard } from "../../../models_page/components/ModelCard";
import { Comment } from "./Comment";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export const CommentedDatasets = () => {
    return(
        <Box  sx={{ display: "flex", flexDirection: 'column', flexGrow: 1 }} maxWidth="740px">
            <Box display="flex" alignItems="center" p={2} bgcolor={'#05254A'} sx={{borderRadius:{xs:'30px 30px 0 0', md:'0 30px 0 0'}}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" color={'white'} >
                        Set de datos comentados
                    </Typography>
                </Box>
            </Box>
            {/* <Box display = "flex" justifyContent="center" alignContent="center" textAlign={"left"} margin={"auto"}>
                <Box margin={"auto"}>
                    <ModelCard
                    autor='Fabricio Alvarado Alvarado'
                    modelName='Reconocimiento de personas'
                    grade='9.7'
                    precision='95%'
                    tags={['Facial recognition']} 
                    />
                </Box>
                <Box margin={"auto"}>
                    <Comment autor={"Fabricio Alvarado Alvarado"} description={"Excelente modelo"} date={"15/06/2023"} funtionParent={()=> {return false;}} />
                    <Comment autor={"Fabricio Alvarado Alvarado"} description={"¿Saben si funciona con un dataset propio?"} date={"15/06/2023"} funtionParent={()=> {return false;}} /> 
                    <Comment autor={"Fabricio Alvarado Alvarado"} description={"La estructura es muy robusta, soporta datasets complicados y con una muy buena precision"} date={"15/06/2023"} funtionParent={()=> {return false;}} /> 
                </Box>
            </Box> */}
            <Box margin={'150px auto'} display={'flex'}> 
                <ErrorOutlineIcon></ErrorOutlineIcon>
                <Typography>You have not commented any dataset</Typography>
            </Box>
        </Box>
    );
}