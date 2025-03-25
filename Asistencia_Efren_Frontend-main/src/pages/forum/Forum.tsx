import { Box, Button, Typography } from "@mui/material";
import { Margin } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import ThreadTable from "./ThreadTable";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";


export const Forum = () => {
  return(
    <Box marginTop={"100px"}>
      <Link to="./new-message">
        <Button href="/forum/new-message" variant="outlined" sx={{margin:"0 auto 15px 5%"}} startIcon={<SendIcon />}>
          Send a new message
        </Button>
      </Link>
      <ThreadTable />
      <SpeedDialFAQS/>
    </Box>

  );
}