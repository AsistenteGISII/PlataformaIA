import { Box } from "@mui/material";
import { CardComment } from "./CardComment";
import { CommentProps } from "../types/CommentProps";
import { CardSubComment } from "./CardSubComment";
import TextFieldComment from "./TextFieldComment";
import React from "react";


type props = {
    comments: Array<CommentProps>
}
export function PanelDiscussion({comments}: props ){
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

    return(
        <Box>
            {comments.map((x:CommentProps) => {
                return(
                    <>
                    <CardComment autor={x.autor} description={x.description} date={x.date} funtionParent={askIsReply}/>
                    {textFieldSubComment}
                    <CardSubComment autor={x.autor} description={x.description} date={x.date} />
                    <CardSubComment autor={x.autor} description={x.description} date={x.date} />
                    <TextFieldComment />
                    </>
                );
            })}

        </Box>
    ); 
}