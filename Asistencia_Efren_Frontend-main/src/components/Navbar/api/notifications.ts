import api from '../../../context/UserContext/API';

const URL_NOTIFICATION = '/notifications'

export const getNotificationsByUser = async (userId: any) => {
  try {
    const response = await api.get(`${URL_NOTIFICATION}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching notifications');
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await api.get(`${URL_NOTIFICATION}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching notifications');
  }
}

export const createNotification = async (notification: any) => {
  try {
    const response = await api.post(`${URL_NOTIFICATION}`, notification, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error creating notification');
  }
};

export const deleteNotification = async (id: any) => {
  try {
    const response = await api.delete(`${URL_NOTIFICATION}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting notification');
  }
};

export const clearNotifications = async (userId: any) => {
  try {
    const response = await api.delete(`${URL_NOTIFICATION}/clear/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error clearing notifications');
  }
};

export const clearAllNotifications = async () => {
  try {
    const response = await api.delete(`${URL_NOTIFICATION}/clearAll`);
    return response.data;
  } catch (error) {
    throw new Error('Error clearing notifications');
  }
};