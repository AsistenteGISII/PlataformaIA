import { Box, Button, Divider, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SubCommentProps } from "../types/SubCommentProps";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

export function CardSubComment ({description, autor, date} : SubCommentProps){
    return(
        <Box display={"flex"} >
            <SubdirectoryArrowRightIcon sx={{margin:"auto", width:"10%"}} fontSize="large"></SubdirectoryArrowRightIcon>
            <Box sx={{ border: "2px solid lightgreen", position: "relative", borderRadius: "5px", padding: '10px 20px', margin: '0 auto 20px auto', width:"90%"}} bgcolor={"RGB(250, 250, 250)"}>
                <Typography variant="h6" component="p" display={'flex'}>
                    <AccountCircleIcon fontSize="large" sx={{ marginRight: '10px' }} />{autor}
                </Typography>
                <Typography variant="caption" component="p">
                    {date}
                </Typography>
                <Typography variant="body1" component="p" fontSize={14} textAlign={"justify"} margin={'10px 20px 50px 20px'}>
                    {description}
                </Typography>
                <Button sx={{ margin: "10px", position: "absolute", bottom: 0, right: 80 }} variant="outlined" color="primary" startIcon={<ThumbUpRoundedIcon />}>140
                </Button>
                <Button sx={{ margin: "10px", position: "absolute", bottom: 0, right: 0 }} variant="outlined" color="primary" startIcon={<ThumbDownAltRoundedIcon />}>34
                </Button>
            </Box>
        </Box>
    );
}