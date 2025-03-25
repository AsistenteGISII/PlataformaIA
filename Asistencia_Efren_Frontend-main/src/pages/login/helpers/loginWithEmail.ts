import { LoginForm } from "../types/LoginForm";
import api from "../../../context/UserContext/API";

export const loginWithEmail = async ({ email, password }: LoginForm) => {
  try {
    const res = await api.post('/auth/in', { email, password });
    if (!res.data.success) {
      return { success: false, message: res.data.msg };
    }
    if (!res.data.user.verified) {
      return { success: false, message: 'Usuario no verificado. Revise su correo electrónico.' };
    }
    return { success: true, data: res.data };

  } catch (error) {
    return handleError(error, 'Error al iniciar sesión. Intente de nuevo más tarde.');
  }
};

export const loginWithGoogle = async (token: string) => {
  try {
    const res = await api.post(`/auth/google/callback`, { token });
    return res.data;
  } catch (error) {
    return false;
  }
};

const handleError = (error: any, defaultMessage: string) => {
  if (error.response) {
    return { success: false, message: error.response.data.msg };
  } else {
    return { success: false, message: defaultMessage };
  }
};
