import { Divider, Menu, MenuItem } from "@mui/material";

type MenuProps = {
    anchorEl: HTMLElement | null;
    menuId: string;
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    myAccountNavigate: () => void;
    onLogout: () => void;
}

export const NavbarMenu = ({ anchorEl, handleMenuClose, myAccountNavigate, isMenuOpen, menuId, onLogout }: MenuProps) => {
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                '& .MuiPaper-root': {
                    width: '12rem', 
                    marginRight: 0, 
                    right: 0,        
                }
            }}
        >
            <MenuItem onClick={myAccountNavigate} style={{ textDecoration: 'none' }}>Mi cuenta</MenuItem>
            <Divider />
            <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
        </Menu>
    )
}
