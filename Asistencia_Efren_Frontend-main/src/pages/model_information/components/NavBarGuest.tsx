import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { Outlet } from 'react-router-dom';

export default function NavBarGuest() {
  return (
    <>
    <Box sx={{ flexGrow: 1 , position: "fixed"}}>
      <AppBar>
        <Toolbar sx={{margin : "0 20px"}}>
          
          <Button sx={{ marginLeft: "70px" }} color="inherit">Models</Button>
          <Button sx={{ marginLeft: "30px" }} color="inherit">Forum</Button>
          
          <Typography sx={{ flexGrow: 1 }}></Typography>
          
          <Button sx={{ marginRight: "15px" }} variant="outlined" color="inherit">Login</Button>
          <Button variant="outlined" color="inherit">Sign Up</Button>

        </Toolbar>
      </AppBar>
    </Box>

    <Outlet />
    </>
  );
}