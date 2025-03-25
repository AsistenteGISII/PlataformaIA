import api from '../../../context/UserContext/API';

// Get models by user ID
export const getMyModels = async (userId: number) => {
    try {
        const response = await api.get(`/relationshipModel/myModels/${userId}`);
        return response; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar los modelos');
    }
};