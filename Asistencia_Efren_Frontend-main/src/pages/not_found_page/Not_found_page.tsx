

import { useNavigate } from "react-router";

import { Box, Button, Typography } from "@mui/material";
import MoodBadIcon from '@mui/icons-material/MoodBad';


export const Not_found_page = () => {
    const navigate = useNavigate();

    return(
        <Box margin={"60px auto"} textAlign={"center"} alignItems={"center"}>
            <Box display={"flex"} justifyContent={"center"} margin={"auto"} width={"fit-content"}>
                <MoodBadIcon fontSize="large" sx={{margin: "auto", color: "blue", fontSize: "80px"}}></MoodBadIcon>  
                <Typography variant="h2" color={"blue"} margin={"auto 0 auto 20px"} fontSize={"80px"}>
                    404
                </Typography>
            </Box>
            
            <Typography variant="h4" margin={"10px auto"}>
                <b> Page not found</b>
            </Typography>
            
            <Typography margin={"0 auto 10px auto"} width={"450px"} alignItems={"center"} color={"gray"}>
                Sorry, we couldn't find the page you requested. Please go back to the homepage.
            </Typography>
            
            <Button variant="contained" onClick={() => { navigate(-1) }}>
                Go back
            </Button>
        </Box>
    );
}