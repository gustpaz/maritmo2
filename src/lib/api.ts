import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || 'Ocorreu um erro na requisição';
    throw new Error(message);
  }
);

export const apiService = {
  auth: {
    login: (username: string, password: string) =>
      api.post<{ token: string }>('/auth/login', { username, password }),
    changePassword: (oldPassword: string, newPassword: string) =>
      api.post('/auth/change-password', { oldPassword, newPassword }),
  },
  packages: {
    list: () => api.get('/packages'),
    create: (data: any) =>
      api.post('/packages', data),
    update: (id: string, data: any) =>
      api.put(`/packages/${id}`, data),
    delete: (id: string) =>
      api.delete(`/packages/${id}`),
  },

  bookings: {
    list: () => api.get('/bookings'),
    create: (data: any) =>
      api.post('/bookings', data),
    updateStatus: (id: string, status: string) =>
      api.put(`/bookings/${id}/status`, { status }),
  },

  content: {
    getMedia: () => api.get('/content/media'),
    createMedia: (data: any) =>
      api.post('/content/media', data),
    deleteMedia: (id: string) =>
      api.delete(`/content/media/${id}`),
    
    getTestimonials: () => api.get('/content/testimonials'),
    createTestimonial: (data: any) =>
      api.post('/content/testimonials', data),
    updateTestimonial: (id: string, data: any) =>
      api.put(`/content/testimonials/${id}`, data),
    deleteTestimonial: (id: string) =>
      api.delete(`/content/testimonials/${id}`),
  },
};