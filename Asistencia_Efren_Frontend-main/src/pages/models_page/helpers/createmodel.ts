import api from '../../../context/UserContext/API';
import { ModelDetails } from './validations';

export const createmodel = async (
  modelDetails: ModelDetails
): Promise<{success: boolean; message: string}> => {
  try {
    await api.post<{ data: { id: number } }>(`/models/`, {
      user_id: modelDetails.user_id,
      model_name: modelDetails.model_name,
      small_description: modelDetails.small_description,
      large_description: modelDetails.large_description,
      accuracy: modelDetails.accuracy,
      url_colab: modelDetails.url_colab,
      url_datasets: modelDetails.url_datasets,
      url_papers: modelDetails.url_papers,
      categories: modelDetails.categories,
    });

    return { success: true, message: 'El modelo se ha creado exitosamente. Su solicitud será revisada por un administrador para su aprobación.' };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error creating model');
  }
};