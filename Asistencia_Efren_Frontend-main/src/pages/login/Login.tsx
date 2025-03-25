import { FormEvent, useContext, useState } from "react";
import { Paper, Box, TextField, Button, Typography, InputAdornment, IconButton, Alert, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "./helpers";
import { LoginForm } from "./types/LoginForm";
import { useForm, useSeePassword } from "../../hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext/UserContext";
import AlertTitle from '@mui/material/AlertTitle';
import GoogleIcon from '@mui/icons-material/Google';
import SpeedDialFAQS from "../../components/FAQs/SpeedDialFAQS";

const LoginFormInitValue: LoginForm = {
  email: '',
  password: ''
};

export const Login = () => {
  const { formState, onInputChange } = useForm<LoginForm>(LoginFormInitValue);
  const { passwordVisible, handleMouseDownPassword, handleMouseUpPassword } = useSeePassword();
  const [error, setError] = useState<string | null>(null);
  const ContxValues = useContext(UserContext);
  const navigate = useNavigate();

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await loginWithEmail(formState);
  
    if (!data.success) {
      setError(data.message);
      return;
    } 
    const { token, user } = data.data;
    ContxValues?.login({ ...user }, token);
    handelRedirect();
  };

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  const handelRedirect = () => {
    navigate('/');
  };
  

  return (
    <Box>
      <Paper
        elevation={3}
        component="form"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", m: "11.5rem auto", width: "22rem", p: "1.5rem" }}
        onSubmit={onFormSubmit}
      >
        <Typography variant="h4">
          Inicio de sesión
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "1.5rem" }} />
        <TextField
          id="email" label="Correo electrónico" type="email" name="email"
          variant="outlined"
          size="small"
          sx={{ mb: "10px", width: "100%" }}
          required
          value={formState.email}
          onChange={onInputChange}
          autoFocus
        />
        <TextField
          id="password" label="Contraseña" name="password"
          variant="outlined"
          size="small"
          type={passwordVisible ? "text" : "password"}
          sx={{ mb: "20px", width: "100%" }}
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
          value={formState.password}
          onChange={onInputChange}
        />
        <Box sx={{ mb: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{ mr: "5px", width: "50%" }} type="submit" >
            Acceder
          </Button>
          <Link style={{ width: "50%" }} to="/signup">
            <Button variant="contained" sx={{ width: "100%" }}>
              Registrarse
            </Button>
          </Link>
        </Box>
        <Box sx={{ mb: "30px", width: "100%" }}>
          <Link to="/forgot_password" style={{ textDecoration: 'none' }}>
            <Button variant="text" sx={{ width: "100%" }}>
              Olvidé mi contraseña
            </Button>
          </Link>
        </Box>
        <Button variant="contained" color="error" sx={{ width: "70%" }} onClick={handleGoogleLogin}>
          Inicio con google <GoogleIcon />
        </Button>
      </Paper>
      {error && (
        <Alert
          variant="filled"
          severity={error.includes('Usuario no verificado') ? 'warning' : 'error'}
          sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}
        >
          <AlertTitle>{error.includes('Usuario no verificado') ? 'Advertencia' : 'Error'}</AlertTitle>
          {error}
        </Alert>
      )}
      <Box className="container_actions">
        <SpeedDialFAQS />
      </Box>
    </Box>
  );
};
