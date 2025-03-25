import React, { useState, useEffect, useRef } from "react";
import { Paper, TextField, Button, Typography, Alert, Grid } from "@mui/material";
import { sendOTPEmail, verifyOTP, resetPassword } from "../helpers/resetPassword"; 
import ModalSuccess from "../components/ModalSuccess";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [isEmailInputVisible, setIsEmailInputVisible] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalType, setModalType] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyOtpButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      } else if (index === otp.length - 1 && value) {
        verifyOtpButtonRef.current?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && index === otp.length - 1) {
      e.preventDefault(); 
      handleVerifyOtp();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setModalType(false);
      const response = await sendOTPEmail(email);

      if (response.success) {
        setMessage(response.msg);
        setSuccessModalOpen(true);
        setOtpSent(true);
        setResendEnabled(false);
        setResendTimer(60);
        setIsEmailInputVisible(false);
      } else {
        setError(response.message || 'Error sending OTP');
        setIsEmailInputVisible(true);
      }
    } catch (err) {
      setError('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await verifyOTP(email, enteredOtp);
      if (response.success) {
        setError(null);
        const resetResponse = await resetPassword(email);
        if (resetResponse.success) {
          setMessage(response.msg); 
          setModalType(true);
          setSuccessModalOpen(true);
        } else {
          setError(resetResponse.message || 'Hubo un error al restablecer la contraseña');
        }
      } else {
        setError(response.message || 'OTP incorrecto. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error verifying OTP');
    }
    setOtp(["", "", "", ""]);
  };

  const handleResendOtp = async () => {
    setError(null);
    setMessage(null);
    try {
      const response = await sendOTPEmail(email);
      setMessage(response.msg)
      setResendEnabled(false);
      setResendTimer(60);
    } catch (err) {
      setError("Falló el reenvío del OTP.");
    }
  };

  const handleBackToEmailInput = () => {
    setIsEmailInputVisible(true);
    setOtpSent(false);
    setMessage(null);
  };

  useEffect(() => {
    let interval: number;
    if (otpSent && resendTimer > 0) {
      interval = window.setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => window.clearInterval(interval);
  }, [otpSent, resendTimer]);

  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(errorTimer);
    }
  
    if (message && !successModalOpen) {
      const messageTimer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(messageTimer);
    }
  }, [error, message, successModalOpen]);
  

  return (
    <Paper
      elevation={3}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "10rem auto",
        width: "24rem",
        p: "1.5rem",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">Restablecer Contraseña</Typography>
      <hr style={{ width: "100%", marginBottom: "1.5rem" }} />

      {isEmailInputVisible ? (
        <>
          <Typography variant="body1" sx={{ mb: "20px" }}>
            Por favor, introduce tu correo electrónico para recibir un código de verificación.
          </Typography>
          <TextField
            id="email"
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            size="small"
            sx={{ mb: "20px", width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            Enviar OTP
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: "20px" }}>
            Introduce el código de verificación (OTP) enviado a tu correo electrónico.
          </Typography>

          <Grid container spacing={2} sx={{ mb: "20px" }}>
            {otp.map((digit, index) => (
              <Grid item xs={3} key={index}>
                <TextField
                  value={digit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOtpChange(e, index)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
                  inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
                  type="text"
                  variant="outlined"
                  sx={{ textAlign: "center" }}
                  inputRef={(el) => (otpRefs.current[index] = el)} 
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            onClick={handleVerifyOtp}
            ref={verifyOtpButtonRef} 
            sx={{ mt: "20px", width: "100%" }}
          >
            Verificar OTP
          </Button>

          <Button
            variant="text"
            onClick={handleResendOtp}
            disabled={!resendEnabled}
            sx={{ mt: "10px" }}
          >
            Reenviar OTP ({resendTimer} segundos)
          </Button>

          <Button
            variant="text"
            onClick={handleBackToEmailInput}
            sx={{ mt: "10px" }}
          >
            Volver a introducir el correo electrónico
          </Button>
        </>
      )}

      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <ModalSuccess open={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={message} modalType={modalType} />
    </Paper>
  );
};

export default ForgotPassword;
