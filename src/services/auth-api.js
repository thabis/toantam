
import { apiRequest } from './base-api';

export const apiLogin = body => apiRequest('POST', '/users/session', body)
  .then(res => res.data)
  .catch((err) => {
    return { err };
  });

export const apiMe = token => apiRequest('GET', '/users/me',
  undefined, { Authorization: `Bearer ${token}` })
  .then(res => res.data)
  .catch(err => ({ err }));

export const apiLogout = token => apiRequest('DELETE', '/users/session',
  undefined, { Authorization: `Bearer ${token}` })
  .then(res => res.data)
  .catch(err => ({ err }));
