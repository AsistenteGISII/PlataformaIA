import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';

type NavbarMobileMenuProps = {
    mobileMoreAnchorEl: HTMLElement | null;
    mobileMenuId: string;
    isMobileMenuOpen: boolean;
    handleMobileMenuClose: () => void;
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const NavbarMobileMenu = ({ mobileMenuId, handleMobileMenuClose, handleProfileMenuOpen, isMobileMenuOpen, mobileMoreAnchorEl }: NavbarMobileMenuProps) => {
  return (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
            Perfil
        </MenuItem>
        </Menu>
  )
}

