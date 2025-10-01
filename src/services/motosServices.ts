import api from './api';

export const getMotos = async () => {
  try {
    const response = await api.get('/motos'); // GET /api/motos
    return response.data.content; // se a API retorna Page<MotoDTO>
  } catch (error: any) {
    console.error('Erro ao buscar motos:', error.response?.data || error.message);
    throw error;
  }
};

export const createMoto = async (moto: { numero: string; status: string; patio: { id: string } }) => {
  try {
    const response = await api.post('/motos', moto); // POST /api/motos
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar moto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateMoto = async (id: string | number, moto: { numero: string; status: string; patio: { id: string } }) => {
  try {
    const response = await api.put(`/motos/${id}`, moto); // PUT /api/motos/{id}
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar moto:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteMoto = async (id: string | number) => {
  try {
    const response = await api.delete(`/motos/${id}`); // DELETE /api/motos/{id}
    return response.data;
  } catch (error: any) {
    console.error('Erro ao deletar moto:', error.response?.data || error.message);
    throw error;
  }
};
