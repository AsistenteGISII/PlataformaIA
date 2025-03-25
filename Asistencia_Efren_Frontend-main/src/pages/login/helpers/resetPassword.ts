import api from "../../../context/UserContext/API";

export const sendOTPEmail = async (email: string) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data; 
  } catch (error) {
    return handleError(error, 'Algo salió mal al enviar el correo de OTP');
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data; 
  } catch (error) {
    return handleError(error, 'Algo salió mal al verificar el OTP');
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    return handleError(error, 'Algo salió mal al restablecer la contraseña');
  }
};

const handleError = (error: any, defaultMessage: string) => {
  if (error.response) {
    return { success: false, message: error.response.data.msg };
  } else {
    return { success: false, message: defaultMessage };
  }
};
