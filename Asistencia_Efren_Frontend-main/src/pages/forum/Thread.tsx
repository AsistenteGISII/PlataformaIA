import React from 'react'
import { CardComment } from '../model_information/components/CardComment'
import { Box, Typography } from '@mui/material';
import TextFieldComment from '../model_information/components/TextFieldComment';
import { CardSubComment } from '../model_information/components/CardSubComment';
import { useParams } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SpeedDialFAQS from '../../components/FAQs/SpeedDialFAQS';


export const Thread = () => {
    const { id } = useParams();
    const [isReply, setIsReply] = React.useState(false);

    const askIsReply = (isOrNot: boolean) => {
        setIsReply(isOrNot)
    };

    let textFieldSubComment = <Box></Box>;

    if(isReply){
        textFieldSubComment = 
        <Box margin={"0 10px 20px 0"} display={'flex'} justifyContent={'end'}>
            <Box width={'90%'} ><TextFieldComment /> </Box>
        </Box>;
    }
    
  return (
    <Box sx={{margin:{md:'150px 15% 0 15%',xs:'150px 10% 0 10%'}}} border={'1px black solid'} padding={'20px'} borderRadius={'5px'} bgcolor={'RGB(240, 240, 240)'}>
        <Box sx={{border:"1px solid black", backgroundColor:"RGB(240, 240, 240)", borderRadius:"5px", padding: '10px 20px', marginBottom:'30px'}}>
            <Typography variant="h6" component="p" display={'flex'} >
                <AccountCircleIcon fontSize="large" sx={{marginRight:'10px'}}/>Fabricio Alvarado Alvarado
            </Typography>
            <Typography variant="caption" component="p">
                18/09/2024
            </Typography>
            <Typography variant="body1" component="p" fontSize={14} textAlign={"justify"} margin={'10px 20px 50px 20px'}>
                Este es el comentario principal del hilo con id igual a {id}
            </Typography>
        </Box>
        <Box mx={'30px'}>
           <CardComment description='Hola este es un comentario' autor='Juan Danilo Perez' date='2023-04-23' funtionParent={askIsReply}/>
            {textFieldSubComment}
            <CardSubComment autor='Juan Danilo Perez' description='Hola este es un subcomentario' date='2023-04-23' />
            <CardSubComment autor='Juan Danilo Perez' description='Hola este es un subcomentario' date='2023-04-23' />
            <TextFieldComment /> 
        </Box>
        <SpeedDialFAQS/>
    </Box>
  )
}

 