

import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../../context/UserContext/UserContext";


export const useNavbar = () => {
    const ContxValues = useContext(UserContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const [publicButtonsMoreAnchorEl, setPublicButtonsMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isPublicButtonsMenuOpen = Boolean(publicButtonsMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handlePublicButtonsMenuClose = () => {
        setPublicButtonsMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handlePublicButtonsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setPublicButtonsMoreAnchorEl(event.currentTarget);
    };
    const myAccountNavigate = () => {
        handleMenuClose();
        navigate("/account");
    }
    const onLogout = () => {
        ContxValues?.logout();
        handleMenuClose();
        navigate("/");
    }

    return {
        anchorEl,
        mobileMoreAnchorEl,
        publicButtonsMoreAnchorEl,
        isMenuOpen,
        isMobileMenuOpen,
        isPublicButtonsMenuOpen,
        handleProfileMenuOpen,
        handleMenuClose,
        handleMobileMenuClose,
        myAccountNavigate,
        handleMobileMenuOpen,
        handlePublicButtonsMenuClose,
        handlePublicButtonsMenuOpen,
        onLogout,
        logged: ContxValues?.logged
    }
}