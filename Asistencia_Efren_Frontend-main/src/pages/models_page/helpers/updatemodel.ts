import api from '../../../context/UserContext/API';
import { ModelDetails } from './validations';

// Update model details
export const updatemodel = async (
  modelId: number,
  modelDetails: ModelDetails, 
): Promise<{ success: boolean; message: string }> => {
  try {
    await api.put(`/models/${modelId}`, {
      model_name: modelDetails.model_name,
      small_description: modelDetails.small_description,
      large_description: modelDetails.large_description,
      accuracy: modelDetails.accuracy,
      url_colab: modelDetails.url_colab,
      url_datasets: modelDetails.url_datasets,
      url_papers: modelDetails.url_papers,
      categories: modelDetails.categories,
      version: modelDetails.version,
      privated: modelDetails.privated,
      status: 'Pending',
    });
    return { success: true, message: 'El modelo se ha actualizado exitosamente.' };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error updating model');
  }
};
