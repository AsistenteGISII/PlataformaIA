import { Link } from "react-router-dom";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { NavbarButtonStyles } from "../types"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandMore } from "@mui/icons-material";
import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext/UserContext";

type NavbarPublicButtonsProps = {
    navbarButtonsStyles: NavbarButtonStyles;
    publicButtonsMenuId: string;
    handlePublicButtonsMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const NavbarPublicButtons = ({ navbarButtonsStyles, handlePublicButtonsMenuOpen, publicButtonsMenuId }: NavbarPublicButtonsProps) => {
    const [adminAnchorEl, setAdminAnchorEl] = React.useState<null | HTMLElement>(null);

    const ContxValues = useContext(UserContext);

    const handleMenuAdminOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAdminAnchorEl(event.currentTarget);
    };

    const handleMenuAdminClose = () => {
        setAdminAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={publicButtonsMenuId}
                    aria-haspopup="true"
                    onClick={handlePublicButtonsMenuOpen}
                    color="inherit"
                >
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Link to="/">
                <img src="\assets\logoTECBLANCO.png" alt="Logo" style={{ marginRight: '10px' }} width={"200px"} />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Link to="./models" style={{ ...navbarButtonsStyles, margin: "auto 10px" }}>
                    <Button color="inherit">Modelos</Button>
                </Link>
                <Link to="./datasets" style={{ ...navbarButtonsStyles, margin: "auto 10px" }}>
                    <Button color="inherit">Sets de datos</Button>
                </Link>
                <Link to="./news" style={{ ...navbarButtonsStyles, margin: "auto 10px" }}>
                    <Button color="inherit">Noticias</Button>
                </Link>
                <Link to="./community" style={{ ...navbarButtonsStyles, margin: "auto 10px" }}>
                    <Button color="inherit">Comunidad</Button>
                </Link>
                {ContxValues?.user?.user_role === "ADMIN" && (
                    <>
                        <Button
                            onClick={handleMenuAdminOpen}
                            endIcon={<ExpandMore sx={{ fontSize: '20px' }} />}
                            style={{ ...navbarButtonsStyles }} >
                            ADMIN
                        </Button>
                        <Menu
                            anchorEl={adminAnchorEl}
                            open={Boolean(adminAnchorEl)}
                            onClose={handleMenuAdminClose}
                        >
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/users_management'>Usuarios</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/models_management'>Modelos</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/datasets_management'>Set de datos</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/news_management'>Noticias</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/categories_management'>Categorías</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/tickets_management'>Reportes de usuario</MenuItem>
                            <MenuItem onClick={handleMenuAdminClose} component={Link} to='/statistical_reports'>Reportes estadísticos</MenuItem>
                        </Menu>
                    </>
                )}
            </Box>
        </>
    )
}
