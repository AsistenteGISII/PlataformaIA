import api from '../../../context/UserContext/API';
const URL_CATEGORIES = '/categories/visibleCategories';
const URL_MODELS = '/models/'

// Get categories
export const getCategories = async () => {
    try {
        const res = await api.get(`${URL_CATEGORIES}`);
        return res.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get top models grouped by category
export const fetchTopModelsByCategory = async () => {
    try {
        const res = await api.get(`/models/topModelsByCategory/`);
        return res.data; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get trending models 
export const fetchTopModelsByViews = async () => {
    try {
        const res = api.get(`/models/topModelsByViews/`);
        return res; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar las categorías');
    }
};

// Get model info by model ID and user ID
export const fetchModelDataWithUser = async (model_id: number) => {
    try {
        const response = await api.get(`/models/withUser/${model_id}`);
        return response.data.model; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar el modelo');
    }
};

// Get model info by model ID
export const fetchModelData = async (model_id: number) => {
    try {
        const response = await api.get(`/models/${model_id}`);
        return response.data.model; 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar el modelo');
    }
};

// Update view counter
export const updateViewCount = async (id: number, newCount: number) =>{
    await api.put(`${URL_MODELS}${id}`, {
        cont_views: newCount
    });
};

export const fetchComments = async (id_model: number) => {
    try {
        const res = await api.get(`/models/comments/${id_model}`);
        return res.data.comments;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al cargar los comentarios');
    }
};

export const submitComment = async (id_model: number, id_user: number, comment: string) => {
    try {
        const res = await api.post(`/models/comments/${id_model}`, {
            id_user,
            comment,
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Hubo un error al enviar el comentario');
    }
};