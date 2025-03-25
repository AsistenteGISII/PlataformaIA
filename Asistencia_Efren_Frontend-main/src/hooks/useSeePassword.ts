

import { ChangeEventHandler, useState } from "react";

export const useSeePassword = ( initialForm = {} ) => {
  
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const [ confirmPasswordVisible, setConfirmPasswordVisible ] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setPasswordVisible(true)
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setPasswordVisible(false)
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setConfirmPasswordVisible(true)
    };

    const handleMouseUpConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setConfirmPasswordVisible(false)
    };
  
    return {
        passwordVisible,
        confirmPasswordVisible,
        handleMouseDownPassword,
        handleMouseUpPassword,
        handleMouseDownConfirmPassword,
        handleMouseUpConfirmPassword
    }
}