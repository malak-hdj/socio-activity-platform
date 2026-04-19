import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (matricule, mot_de_passe) =>
    api.post('/auth/login', { matricule, mot_de_passe }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const activitiesAPI = {
  getAll: () => api.get('/activites'),
  getById: (id) => api.get(`/activites/${id}`),
};

export const inscriptionsAPI = {
  create: (data) => api.post('/inscriptions', data),
  getMyInscriptions: () => api.get('/inscriptions/utilisateur/me'),
  cancel: (id) => api.post(`/inscriptions/${id}/annuler`),
};

export default api;
