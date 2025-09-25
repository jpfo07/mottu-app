import api from './api';

export const getMotos = async (userId: string) => {
  const response = await api.get('/motos'); // endpoint real da sua API
  // filtra apenas motos do usuário logado
  return response.data.filter((m: any) => m.userId === userId);
};

export const createMoto = async (moto: any, userId: string) => {
  const response = await api.post('/motos', { ...moto, userId });
  return response.data;
};

export const updateMoto = async (id: string, moto: any) => {
  const response = await api.put(`/motos/${id}`, moto);
  return response.data;
};

export const deleteMoto = async (id: string) => {
  const response = await api.delete(`/motos/${id}`);
  return response.data;
};
