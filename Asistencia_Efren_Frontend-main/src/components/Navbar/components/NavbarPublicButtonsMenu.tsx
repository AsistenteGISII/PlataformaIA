import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

type NavbarPublicButtonsMenuProps = {
    publicButtonsMoreAnchorEl: HTMLElement | null;
    publicButtonsMenuId: string;
    isPublicButtonsMenuOpen: boolean;
    handlePublicButtonsMenuClose: () => void;
    handlePublicButtonsMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const NavbarPublicButtonsMenu = ({ publicButtonsMenuId, handlePublicButtonsMenuClose, handlePublicButtonsMenuOpen, isPublicButtonsMenuOpen, publicButtonsMoreAnchorEl }: NavbarPublicButtonsMenuProps) => {
    return (
        <Menu
            anchorEl={publicButtonsMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={publicButtonsMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isPublicButtonsMenuOpen}
            onClose={handlePublicButtonsMenuClose}
        >
            <MenuItem component={Link} to="/models">
                Modelos
            </MenuItem>
            <MenuItem component={Link} to="/datasets">
                Sets de datos
            </MenuItem>
            <MenuItem component={Link} to="/news">
                Noticias
            </MenuItem>
            <MenuItem component={Link} to="/community">
                Comunidad
            </MenuItem>
        </Menu>
    )
}
