import { SignupForm } from "../types/SignupForm";
import api from "../../../context/UserContext/API";

export const signUpUser = async (formInformation: SignupForm) => {
  try {
    const res = await api.post(`/auth/up`, formInformation); 

    if (!res.data.success) {
      return { success: false, message: res.data.msg }; 
    }

    return { success: true, message: res.data};
  } catch (error) {
    return handleError(error, 'Error al registrar. Intente de nuevo más tarde.');
  }
};

const handleError = (error: any, defaultMessage: string) => {
  if (error.response) {
    return { success: false, message: error.response.data.msg }; 
  } else {
    return { success: false, message: defaultMessage }; 
  }
};
