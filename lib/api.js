// lib/api.js
// All calls to the backend go through here.
// Set NEXT_PUBLIC_API_URL in your .env.local file.

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create an axios instance with the base URL pre-set
const api = axios.create({ baseURL: BASE_URL });

// Attach the JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Auth ----
export const register = (data) => api.post('/api/auth/register', data);
export const login    = (data) => api.post('/api/auth/login', data);
export const getMe    = ()     => api.get('/api/auth/me');

// ---- Agents ----
export const getAgents    = ()       => api.get('/api/agents');
export const createAgent  = (data)   => api.post('/api/agents', data);
export const updateAgent  = (id, d)  => api.put(`/api/agents/${id}`, d);
export const toggleAgent  = (id)     => api.put(`/api/agents/${id}/toggle`);
export const deleteAgent  = (id)     => api.delete(`/api/agents/${id}`);

// ---- Calls ----
export const getCalls     = (params) => api.get('/api/calls', { params });
export const getCallStats = ()       => api.get('/api/calls/stats');
export const getCall      = (id)     => api.get(`/api/calls/${id}`);

// ---- Bookings ----
export const getBookings   = ()      => api.get('/api/bookings');
export const createBooking = (data)  => api.post('/api/bookings', data);
export const updateBooking = (id, d) => api.put(`/api/bookings/${id}`, d);
export const cancelBooking = (id)    => api.delete(`/api/bookings/${id}`);

export default api;
