import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommentProps } from "../../../model_information/types/CommentProps";

export function Comment ({description, autor, date} : CommentProps){
    return(
        <Box sx={{border:"1px solid lightblue", backgroundColor:"RGB(250, 250, 250)", borderRadius:"5px", padding: '10px 20px', marginBottom:'20px'}}>
            <Typography variant="h6" component="p" display={'flex'} >
                <AccountCircleIcon fontSize="large" sx={{marginRight:'10px'}}/>{autor}
            </Typography>
            <Typography variant="caption" component="p">
                {date}
            </Typography>
            <Typography variant="body1" component="p" fontSize={14} textAlign={"justify"} margin={'10px 20px'}>
                {description}
            </Typography>
        </Box>
    );
}