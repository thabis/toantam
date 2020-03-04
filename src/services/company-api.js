import { apiRequest } from './base-api';

export const apiGetCompany = (token) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', '/companies', undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetAddress = (id) => {
  let url = '?parent_id=10958';
  if (id) {
    url = `?parent_id=${id}`;
  }
  return apiRequest('GET', `/address${url}`, undefined)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiCreateCompany = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('POST', '/companies', body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiUpdateCompany = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('PUT', `/companies/${body.id}`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};
