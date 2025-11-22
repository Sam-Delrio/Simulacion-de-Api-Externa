import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000
});

export const getTasks = () => API.get('/tasks');
export const createTask = data => API.post('/tasks', data);
export const deleteTask = id => API.delete(`/tasks/${id}`);
export const updateTask = (id, patch) => API.patch(`/tasks/${id}`, patch);
