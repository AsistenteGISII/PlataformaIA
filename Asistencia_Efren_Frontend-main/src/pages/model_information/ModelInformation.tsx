import { Box, Chip, Divider, Grid, Rating, Typography } from "@mui/material";
import NavBarGuest from "./components/NavBarGuest";
import NavBarWithoutSearch from "./components/NavBarGuest";
import NavBarUser from "./components/NavBarUser";

import CalificationSelector from "./components/CalificationSelector";
import { Rowing } from "@mui/icons-material";
import AverageCalification from "./components/AverageCalification";
import FloatingActionButtonZoom from "./components/ModelContentNavigation";
import { CommentProps } from "./types/CommentProps";
import { chooseImage } from "../models_page/helpers/chooseImage";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";

type ModelInformationProps = {
    modelName: string,
    smallDescription: string,
    largeDescription: string,
    version: Array<string>,
    date: string,
    autor: string,
    precision: string,
    grade: string,
    tags: Array<string>,
    datasets: Array<string>,
    linkPaper: string,
    linkCode: string,
    listComments: Array<CommentProps>
}

export const ModelInformation = ({ modelName, smallDescription, largeDescription, version, date, autor, precision, grade, tags, datasets, linkPaper, linkCode, listComments }: ModelInformationProps) => {
    return (
        <>
            <Box height={"860px"}>
                <Box margin={"80px auto 10px auto"} width="70%" height={"250px"} overflow={"hidden"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
                    <img
                        src={chooseImage(tags)}
                        alt='Artificial intelligence'
                        loading="lazy"
                        style={{
                            maxWidth: '100%',
                            objectFit: 'cover'
                        }}

                    />
                </Box>

                <Box margin="20px auto" width="70%" display={"flex"} flexWrap={"wrap"}>
                    <Box width={"60%"} p={2}>
                        <Typography variant="h4" component="p" textAlign={"left"}>
                            {modelName}
                        </Typography>
                        <Typography variant="caption" component="p" textAlign={"left"} margin={"0 0 20px 30px"}>
                            By {autor} ({date})
                        </Typography>
                        <Typography variant="body1" component="p" fontSize={18} textAlign={"justify"}>
                            {smallDescription}
                        </Typography>
                    </Box>
                    <Box width={'10%'}> </Box>
                    <Box width={"20%"} marginTop={"10px"} p={2} textAlign={"center"}>


                        <Typography variant="body2" component="p" marginTop={"20px"}  >
                            Average calification
                            <AverageCalification grade={grade} />
                        </Typography>

                        <Typography variant="body2" component="p" marginTop={"20px"}>
                            Calificate the model
                            <CalificationSelector />
                        </Typography>
                    </Box>
                </Box>
                <FloatingActionButtonZoom linkCode={linkCode} linkPaper={linkPaper} comments={listComments} largeDescription={largeDescription} precision={precision} datasets={datasets} tags={tags} />
            </Box>
            <SpeedDialFAQS />
        </>
    );
}