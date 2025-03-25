import { Box, Button, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CommentProps } from "../types/CommentProps";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import React from "react";

export function CardComment ({description, autor, date, funtionParent} : CommentProps){
    const [isReply, setIsReply] = React.useState(true);

    const handleClickReply = () => {
        funtionParent(isReply)
        setIsReply(!isReply)
    };

    return(
        <Box sx={{border:"2px solid lightblue", position: "relative", backgroundColor:"RGB(250, 250, 250)", borderRadius:"5px", padding: '10px 20px', marginBottom:'20px'}}>
            <Typography variant="h6" component="p" display={'flex'} >
                <AccountCircleIcon fontSize="large" sx={{marginRight:'10px'}}/>{autor}
            </Typography>
            <Typography variant="caption" component="p">
                {date}
            </Typography>
            <Typography variant="body1" component="p" fontSize={14} textAlign={"justify"} margin={'10px 20px 50px 20px'}>
                {description}
            </Typography>
            <Button sx={{margin: "10px", position:"absolute", bottom:0, right:163}} variant="outlined"  color="primary" startIcon={<ThumbUpRoundedIcon />}>140
            </Button>    
            <Button sx={{margin: "10px", position:"absolute", bottom:0, right:82}} variant="outlined" color="primary" startIcon={<ThumbDownAltRoundedIcon />}>34
            </Button>
            <Button sx={{margin: "10px", position:"absolute", bottom:0, right:0}} variant="outlined" color="primary" onClick={handleClickReply}>Reply
            </Button>
        </Box>
    );
}