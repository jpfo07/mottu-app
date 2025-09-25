import api from './api';

export const getPatios = async (userId: string) => {
  const response = await api.get('/filiais'); // endpoint real da API
  return response.data.filter((p: any) => p.userId === userId);
};

export const createPatio = async (patio: any, userId: string) => {
  const response = await api.post('/filiais', { ...patio, userId });
  return response.data;
};

export const updatePatio = async (id: string, patio: any) => {
  const response = await api.put(`/filiais/${id}`, patio);
  return response.data;
};

export const deletePatio = async (id: string) => {
  const response = await api.delete(`/filiais/${id}`);
  return response.data;
};
