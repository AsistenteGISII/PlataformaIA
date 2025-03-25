import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { UserContext } from '../../../context/UserContext/UserContext';

const GoogleLoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ContxValues = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      try {
        // Decodifica el token para obtener la información del usuario si es necesario
        const user:any = decodeToken(token);
        // Llama a la función login con el usuario decodificado y el token
        ContxValues?.login(user.user, token);
        navigate('/');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [location, ContxValues, navigate]);

  return null;
};

export default GoogleLoginSuccess;
