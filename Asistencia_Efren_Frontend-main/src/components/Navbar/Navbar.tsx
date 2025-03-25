import { AppBar, Box, Toolbar } from "@mui/material";
import {
  NavbarMenu, NavbarMobileMenu,
  NavbarButtonsWhenLogged,
  NavbarButtonsWhenNotLogged,
  NavbarPublicButtons,
  NavbarPublicButtonsMenu
} from "./components";
import { useNavbar } from "./hooks/useNavbar";
import { NotificationsPanel } from './components/NotificationsPanel';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const navbarButtonsStyles = { textDecoration: "none", color: "white" };
const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';
const publicButtonsMenuId = 'primary-search-options-navbar-menu';

export const NavBar = () => {
  const ContxValues = useContext(UserContext);
  const ROLE = ContxValues?.user?.user_role;
  const { handleMenuClose, handleMobileMenuClose, myAccountNavigate,
    handleMobileMenuOpen, handleProfileMenuOpen,
    handlePublicButtonsMenuClose, handlePublicButtonsMenuOpen,
    isMenuOpen, isMobileMenuOpen, isPublicButtonsMenuOpen, onLogout,
    anchorEl, mobileMoreAnchorEl, publicButtonsMoreAnchorEl, logged } = useNavbar();

  return (
    <>
      <Box>
        <AppBar sx={{ background: "linear-gradient(to top, #000000, #05254A)" }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box display={"flex"}>
              <NavbarPublicButtons
                navbarButtonsStyles={navbarButtonsStyles}
                handlePublicButtonsMenuOpen={handlePublicButtonsMenuOpen}
                publicButtonsMenuId={publicButtonsMenuId}
              />
            </Box>
            <Box display={"flex"}>
              {logged && <NotificationsPanel/>}
              {!logged ?
                <NavbarButtonsWhenNotLogged
                  navbarButtonsStyles={navbarButtonsStyles}
                  handleMobileMenuOpen={handleMobileMenuOpen}
                  mobileMenuId={mobileMenuId}
                />
                :
                <NavbarButtonsWhenLogged
                  handleMobileMenuOpen={handleMobileMenuOpen}
                  handleProfileMenuOpen={handleProfileMenuOpen}
                  menuId={menuId}
                  mobileMenuId={mobileMenuId}
                />
                }
            </Box>
          </Toolbar>
        </AppBar>
        <NavbarMobileMenu
          handleMobileMenuClose={handleMobileMenuClose}
          handleProfileMenuOpen={handleProfileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          mobileMenuId={mobileMenuId}
          mobileMoreAnchorEl={mobileMoreAnchorEl}
        />
        <NavbarMenu
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
          menuId={menuId}
          myAccountNavigate={myAccountNavigate}
          onLogout={onLogout}
        />
        <NavbarPublicButtonsMenu
          publicButtonsMoreAnchorEl={publicButtonsMoreAnchorEl}
          publicButtonsMenuId={publicButtonsMenuId}
          isPublicButtonsMenuOpen={isPublicButtonsMenuOpen}
          handlePublicButtonsMenuClose={handlePublicButtonsMenuClose}
          handlePublicButtonsMenuOpen={handlePublicButtonsMenuOpen}
        />
      </Box>
    </>
  );
}
