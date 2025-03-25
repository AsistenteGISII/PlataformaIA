import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import logoTec from '../Navbar/assets/logoTECBLANCO.png';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#002855', color: 'white', padding: 2, mt: 'auto'}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 4 }}>
          <Box
            component="img"
            src={logoTec}
            alt="Logo TEC"
            sx={{
              width: 250,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'center', mr: 4 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <Link color="inherit" href="/terms_and_conditions">
              Políticas de Privacidad
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Teléfono: (506) 2552-5333 / Teléfono de emergencia
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {'© Tecnológico de Costa Rica, Costa Rica 2024'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton color="inherit" href="https://www.facebook.com/tecnologicocostarica" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://x.com/i/flow/login?redirect_after_login=%2FTeccr" target="_blank">
            <XIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com/teccostarica/" target="_blank">
            <Instagram />
          </IconButton>
          <IconButton color="inherit" href="https://www.youtube.com/user/PrensaTec" target="_blank">
            <YouTube />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
