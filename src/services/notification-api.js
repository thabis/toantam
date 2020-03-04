import { apiRequest } from './base-api';

export const apiGetListNotificaions = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/notifications', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiReadMessage = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('PUT', '/notifications', body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};
