import {
    Box,
    Typography
} from '@mui/material';
import TableCategories from './TableCategories';

export default function EditCategories(){
    return (
        <Box mt={10} mb={15}>
            <Typography variant='h3' textAlign={'center'} my={'20px'}> 
                Bandeja de Categorias
            </Typography>
            <Box sx={{ height: 400 }} width={'650px'} m={'50px auto 0'}>
              <TableCategories />
            </Box>
        </Box>
    )
}