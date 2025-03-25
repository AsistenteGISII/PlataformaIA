import React, { useContext } from 'react'
import { AccountCircle, More } from '@mui/icons-material';
import { Box, IconButton, Typography } from "@mui/material";
import { UserContext } from '../../../context/UserContext/UserContext';
type NavbarButtonsWhenLoggedProps = {
    menuId: string;
    mobileMenuId: string;
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const NavbarButtonsWhenLogged = ({ handleMobileMenuOpen, handleProfileMenuOpen, menuId, mobileMenuId }: NavbarButtonsWhenLoggedProps) => {
    const ContxValues = useContext(UserContext);

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle sx={{ fontSize: 40, marginRight: "10px" }} />
                    <Typography>
                        {ContxValues?.user.username}
                    </Typography>
                </IconButton>
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
