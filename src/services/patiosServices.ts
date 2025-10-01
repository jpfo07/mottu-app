import api from './api';

export const getPatios = async () => {
  try {
    // Busca todos os pátios, sem precisar do userId
    const response = await api.get('/filiais', { params: { page: 0, size: 100 } });
    return response.data.content; // retorna o array de FilialDTO
  } catch (error: any) {
    console.error('Erro ao buscar pátios:', error.response?.data || error.message);
    throw error;
  }
};

export const createPatio = async (patio: { nome: string; endereco?: string }) => {
  try {
    const response = await api.post('/filiais', patio);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar pátio:', error.response?.data || error.message);
    throw error;
  }
};

export const updatePatio = async (id: string | number, patio: { nome: string; endereco?: string }) => {
  try {
    const response = await api.put(`/filiais/${id}`, patio);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar pátio:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePatio = async (id: string | number) => {
  try {
    const response = await api.delete(`/filiais/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar pátio:', error.response?.data || error.message);
    throw error;
  }
};