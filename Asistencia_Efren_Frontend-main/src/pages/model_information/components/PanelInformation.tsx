import { Box, Chip, Typography } from "@mui/material";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type PanelInformationProps = {
    largeDescription: string,
    precision: string,
    datasets: Array<string>,
    tags: Array<string>
}

export function PanelInformation({largeDescription, precision, datasets, tags }:PanelInformationProps){
    return(
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ width: '91%', flexShrink: 0 }}>Model description</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Read more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {largeDescription}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ width: '91%', flexShrink: 0 }}>Precision of the model</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Read more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {precision}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ width: '91%', flexShrink: 0 }}>Datasets</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Read more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" component="p" margin="10px auto 0 30px">
                    {datasets.map(x => {
                        return (
                            <Chip label={x} variant="outlined" sx={{marginRight: "10px"}}/>
                        );
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ width: '91%', flexShrink: 0 }}>Categories</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Read more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2" component="p" margin="10px auto 0 30px">
                    {tags.map(x => {
                        return (
                            <Chip label={x} variant="outlined" sx={{marginRight: "10px"}}/>
                        );
                    })}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}