import { FormEvent, useState, useContext } from "react";
import {
  Paper, TextField, Button, Typography, Box,
  IconButton, InputAdornment,
  Divider
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import { useForm, useSeePassword } from "../../hooks";
import { SignupForm } from "./types/SignupForm";
import { signUpUser, validateFormData } from "./helpers";
import { ModalSuccess } from "./components/ModalSuccess";
import { UserContext } from "../../context/UserContext/UserContext";
import { ChangeEvent } from "react";
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";

const SignUpFormInitialValue: SignupForm = {
  id: 0,
  fullname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  verified: true,
  user_role: 'USER'
};

export const Signup = () => {
  const { formState, onInputChange } = useForm<SignupForm>(SignUpFormInitialValue);
  const { passwordVisible, confirmPasswordVisible,
    handleMouseDownPassword, handleMouseUpPassword,
    handleMouseDownConfirmPassword, handleMouseUpConfirmPassword } = useSeePassword();
  const [formValidations, setFormValidations] = useState({
    validFullName: true,
    validUserName: true,
    validEmail: true,
    validPassword: true,
    validConfPassword: true
  });
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ContxValues = useContext(UserContext);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { fullname, email, password, confirmPassword } = formState;
    const { validUName, validEmail, validPassword, samePasswords } = validateFormData(fullname, email, password, confirmPassword);
  
    if (!samePasswords || !validEmail || !validPassword || !validUName) {
      setFormValidations({
        validFullName: validUName,
        validEmail: validEmail,
        validConfPassword: samePasswords,
        validPassword,
        validUserName: true,
      });
      return;
    }

    try {
      const data = await signUpUser(formState);
    
      if (!data.success) {
        setError(data.message); 
        setOpenModalSuccess(false); 
      } else {
        setVerificationMessage(data.message.msg);
        setOpenModalSuccess(true); 
        setError(null);
      }
    } catch (error) {
      setError('Error al registrar. Intente de nuevo más tarde.'); 
      setOpenModalSuccess(false); 
    }
  };

  if (ContxValues?.logged) {
    return <Navigate to="/models" />;
  }

  return (
    <Box>
      <Paper
        elevation={3}
        component="form"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: "11.5rem auto", width: "22rem", p: "1.5rem" }}
        onSubmit={onFormSubmit}
      >
        <Typography variant="h4">
          Registro
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "1.5rem" }} />
        <TextField
          id="fullName"
          label="Nombre completo"
          type="text"
          variant="outlined"
          size="small"
          sx={{ mb: "20px", width: "100%" }}
          {...(!formValidations.validFullName && { error: true })}
          {...(!formValidations.validFullName && { helperText: 'El nombre no debe contener números o símbolos' })}
          autoFocus
          required
          name="fullname"
          onChange={onInputChange}
        />
        <TextField
          id="userName"
          label="Nombre de usuario"
          type="text"
          variant="outlined"
          size="small"
          sx={{ mb: "20px", width: "100%" }}
          {...(!formValidations.validUserName && { error: true })}
          {...(!formValidations.validUserName && { helperText: 'El nombre de usuario ya existe' })}
          required
          name="username"
          onChange={onInputChange}
        />
        <TextField
          id="email"
          label="Correo electrónico"
          type="email"
          variant="outlined"
          size="small"
          sx={{ mb: "20px", width: "100%" }}
          error={!formValidations.validEmail || !!error}
          helperText={error || (!formValidations.validEmail ? 'Error de formato en correo electrónico' : '')}
          required
          name="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => { 
            onInputChange(e);
            setError(null);
          }}
          InputProps={{
            title: 'Ejemplo: usuario@ejemplo.com',
          }}
        />
        <TextField
          id="password"
          label="Contraseña"
          variant="outlined"
          size="small"
          type={passwordVisible ? "text" : "password"}
          sx={{ mb: "20px", width: "100%" }}
          {...(!formValidations.validPassword && { error: true })}
          {...(!formValidations.validPassword && { helperText: 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo' })}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label='toggle password visibility'
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          name="password"
          onChange={onInputChange}
        />
        <TextField
          id="confirmPassword"
          label="Confirmar contraseña"
          variant="outlined"
          size="small"
          type={confirmPasswordVisible ? "text" : "password"}
          sx={{ mb: "20px", width: "100%" }}
          {...(!formValidations.validConfPassword && { error: true })}
          {...(!formValidations.validConfPassword && { helperText: 'La contraseña no coincide' })}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label='toggle password visibility'
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}>
                  {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          name="confirmPassword"
          onChange={onInputChange}
        />
        <Typography
          component={Link}
          to="/login"
          sx={{
            textDecoration: "none",
            marginBottom: "10px",
            color: "#6a0dad", 
            "&:hover": {
              color: "#1976d2",
              transition: "color 0.5s ease",
            },
          }}
        >
          ¿Ya estás registrado? ¡Inicia aquí!
        </Typography>
        <Button
          sx={{ mb: "10px", width: "100%" }}
          variant="contained"
          type="submit"
        >
          Registrarse
        </Button>
      </Paper>
      <ModalSuccess open={openModalSuccess} setOpen={setOpenModalSuccess}>
        {verificationMessage}
      </ModalSuccess>
      <Box className="container_actions">
        <SpeedDialFAQS />
      </Box>
    </Box>
  );
};
