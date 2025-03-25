import api from '../../../context/UserContext/API';

// Get datasets by user ID
export const getMyDatasets = async (userId: number) => {
    try {
        const response = await api.get(`/relationshipDataset/myDatasets/${userId}`);
        return response; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar los datasets');
    }
};