import { Link } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material";
import { NavbarButtonStyles } from "../types"
import { More } from "@mui/icons-material";

type NavbarButtonsWhenNotLoggedProps = {
    navbarButtonsStyles: NavbarButtonStyles;
    mobileMenuId: string;
    handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const NavbarButtonsWhenNotLogged = ({navbarButtonsStyles ,handleMobileMenuOpen, mobileMenuId }: NavbarButtonsWhenNotLoggedProps) => {
  return (
    <>
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Link to="/login" style={{ ...navbarButtonsStyles, marginRight: "15px" }}>
        <Button variant="outlined" color="inherit">Iniciar sesión</Button>
      </Link>

      <Link to="/signup" style={navbarButtonsStyles}>
        <Button variant="contained" color="info">Registrarse</Button>
      </Link>
    </Box>

    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
      <More />
      </IconButton>
    </Box>
    </>
  )
}
