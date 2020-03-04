import { apiRequest } from './base-api';

export const apiGetOutSource = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/outsources', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetPrintType = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/print-type', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetPaper = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/paper-type', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetCategories = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/categories', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetCity = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/city?city_id=10958', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};
