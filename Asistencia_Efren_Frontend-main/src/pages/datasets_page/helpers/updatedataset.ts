import api from '../../../context/UserContext/API';
import { DatasetDetails } from './validations';

// Update dataset details
export const updatedataset = async (
  datasetId: number,
  datasetDetails: DatasetDetails, 
): Promise<{ success: boolean; message: string }> => {
  try{
    const response = await api.put(`/datasets/${datasetId}`, {
      dataset_name: datasetDetails.dataset_name,
      description: datasetDetails.description,
      url_source: datasetDetails.url_source,
      url_papers: datasetDetails.url_papers,
      version: datasetDetails.version,
      privated: datasetDetails.privated,
      categories: datasetDetails.categories,
      status: 'Pending',
    });

    if(response)
      return { success: true, message: 'El dataset se ha actualizado exitosamente.' };
    return { success: false, message: 'El dataset no se pudo actualizar.' };
  } catch (error: any) {
    console.error('Error updating dataset:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error updating dataset',
    };
  }
};
