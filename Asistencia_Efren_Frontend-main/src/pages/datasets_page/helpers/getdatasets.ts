import api from '../../../context/UserContext/API';
const URL_CATEGORIES = '/categories/visibleCategories';

// Get categories
export const getCategories = async () => {
    try {
        const res = await api.get(`${URL_CATEGORIES}`);
        return res.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get top datasets grouped by category
export const fetchTopDatasetsByCategory = async () => {
    try {
        const res = await api.get(`/datasets/topDatasetsByCategory/`);
        return res.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get trending datasets 
export const fetchTopDatasetsByViews = async () => {
    try {
        const res = api.get(`/datasets/topDatasetsByViews/`);
        return res; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get dataset info by ID and user ID
export const fetchDatasetDataWithUser = async (dataset_id: number) => {
    try {
        const response = await api.get(`/datasets/withUser/${dataset_id}`);
        return response.data.dataset; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar el dataset');
    }
};

// Get dataset info by ID
export const fetchDatasetData = async (dataset_id: number) => {
    try {
        const response = await api.get(`/datasets/${dataset_id}`);
        return response.data.dataset; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar el dataset');
    }
};

// Update view counter
export const updateViewCount = async (id: number, newCount: number) =>{
    await api.put(`/datasets/${id}`, {
        cont_views: newCount
    });
};

export const fetchComments = async (id_dataset: number) => {
    try {
        const res = await api.get(`/datasets/comments/${id_dataset}`);
        return res.data.comments;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar los comentarios');
    }
};

export const submitComment = async (id_dataset: number, id_user: number, comment: string) => {
    try {
        const res = await api.post(`/datasets/comments/${id_dataset}`, {
            id_user,
            comment,
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al enviar el comentario');
    }
};