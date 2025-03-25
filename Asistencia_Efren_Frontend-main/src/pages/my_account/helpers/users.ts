import api from '../../../context/UserContext/API';

// Get user
export const getuser = async (userID: number) => {
    try {
        const res = await api.get(`/users/${userID}`);
        return res.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Update user
export const updateUser = async (
  ID_USER: number,
  name: string,
  username: string,
  email: string,
  password: string
) => {

  const response = await api.put(`/users/${ID_USER}`, {
    fullname: name,
    username: username,
    email: email,
    password: password,
  });

  return response.data;
};

export const resetPassword = async (email: string, currentPassword: string, newPassword: string) => {
  try {
      const response = await api.post('/users/reset-password', { email, currentPassword, newPassword });
      return response.data;
  } catch (error: any) {
      return handleError(error, 'Algo salió mal al restablecer la contraseña');
  }
};

const handleError = (error: any, defaultMessage: string) => {
  if (error.response) {
      if (error.response.status === 400) {
          throw new Error('La contraseña actual es incorrecta.');
      }
  }
  throw new Error(defaultMessage);
};