import api from '../../../context/UserContext/API';
import { DatasetDetails } from './validations';

export const createdataset = async (
  datasetDetails: DatasetDetails,
): Promise<{success: boolean; message: string}> => {
  try {
    await api.post<{ data: { id: number } }>(`/datasets/`, {
      id_user: datasetDetails.id_user,
      dataset_name: datasetDetails.dataset_name,
      description: datasetDetails.description,
      url_source: datasetDetails.url_source,
      url_papers: datasetDetails.url_papers,
      categories: datasetDetails.categories,
    });

    return { success: true, message: 'El dataset se ha creado exitosamente. Su solicitud será revisada por un administrador para su aprobación.' };
  } catch (error: any) {
    console.error('Error creating dataset:', error);
    throw new Error(error.response?.data?.message || 'Error creating dataset');
  }
};