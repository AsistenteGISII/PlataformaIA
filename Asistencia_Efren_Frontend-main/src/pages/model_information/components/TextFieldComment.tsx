import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { ChangeEvent } from 'react';

export default function TextFieldComment() {
  const [message, setMessage] = React.useState("");


  const clean = () => {
    setMessage("");
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>  {
    setMessage(event.target.value)
  }

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", margin:"10px auto", height:"50px", border:"1px solid gray"}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your comment"
        inputProps={{ 'aria-label': 'Type a new comment' }}
        value={message}
        onChange={handleChange}
      />
      <IconButton color='error' type="button" sx={{ p: '10px' }} aria-label="cancel" onClick={clean}>
        <ClearOutlinedIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="send">
        <SendOutlinedIcon />
      </IconButton>
    </Paper>
  );
}