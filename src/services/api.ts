import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base da sua API Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080', // troque para o IP/URL do seu backend
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token'); // se houver JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
