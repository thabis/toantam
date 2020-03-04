
import { apiRequest } from './base-api';

export const apiGetOrder = (token, body) => {
  const { status = 1, order_by = '', sort_direction = '' } = body;
  let status_df = `?status=${status}`;
  let orderby_df = '&order_by=updated_time';
  let sort_df = '&sort_direction=desc';

  if (status !== '') {
    status_df = `?status=${status}`;
  }
  if (order_by !== '') {
    orderby_df = `&order_by=${order_by}`;
  }
  if (sort_direction !== '') {
    sort_df = `&sort_direction=${sort_direction}`;
  }
  const url = `${status_df}${orderby_df}${sort_df}`;
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('GET', `/orders/${url}`, undefined, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiCreateOrder = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  return apiRequest('POST', '/orders/create', body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiUpdateOrder = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  const { id } = body;
  return apiRequest('PUT', `/orders/${id}`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiAssignOrder = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  const { id } = body;
  return apiRequest('PUT', `/orders/${id}/assign`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiRejectOrder = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  const { id } = body;
  return apiRequest('PUT', `/orders/${id}/reject`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetOrderDetail = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  const { id } = body;
  return apiRequest('GET', `/orders/${id}`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};

export const apiGetOrderStatusHistory = (token, body) => {
  const auth = { Authorization: `Bearer ${token}` };
  const { id, status } = body;
  return apiRequest('GET', `/orders/${id}/status?status=${status}&page=1&per_page=1`, body, auth)
    .then(res => res.data)
    .catch(error => (error.data));
};
