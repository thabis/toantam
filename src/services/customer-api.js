import { apiRequest } from './base-api';

export const apiCreateCustomer = (token, body) => apiRequest('POST', '/customers', body, { Authorization: `Bearer ${token}` })
  .then(res => res.data)
  .catch((error) => {
    debugger;
    return error.data;
  });

export const apiGetListCustomer = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/customers', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiUpdateCustomer = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('PUT', `/customers/${body.id}`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};
