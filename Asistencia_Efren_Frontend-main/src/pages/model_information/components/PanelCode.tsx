import { Box, Button, Typography } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';

type PanelCodeProps = {
    linkCode: string,
    linkPaper: string
}

export function PanelCode({linkCode, linkPaper}:PanelCodeProps){
    return (
        <Box margin={"50px auto"} textAlign={"center"} width={'70%'} display={'flex'} justifyContent={'center'}> 
            <Button variant="contained" href={linkCode} color="primary" startIcon={<CodeIcon />}>
                Code
            </Button>
            <Box width={'20%'}></Box>
            <Button variant="contained" href={linkPaper} color="primary" endIcon={<ArticleIcon />}>
                Paper
            </Button>
        </Box>
    );
}