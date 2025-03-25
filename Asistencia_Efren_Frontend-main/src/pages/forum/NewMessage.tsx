import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function NewMessage(){
    return(
        <Container maxWidth="sm" sx={{marginTop:"100px"}}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Type your new message
          </Typography>
          <form>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Container>
    );
}