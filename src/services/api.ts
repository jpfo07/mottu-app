import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base da sua API Spring Boot hospedada no Render
const api = axios.create({
  baseURL: 'https://mottu-java-qjpn.onrender.com/api', // URL da API no Render
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