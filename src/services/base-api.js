import axios from 'axios';
// import { store } from '../App';

const HTTP_OK = 200;

export const baseURL = 'https://api.inantoantam.com';

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   if(urlRequest != config.url){
//     urlRequest = config.url;
//     return config;
//   } else {
//     return Promise.reject({err:{
//       code: 101,
//       response: {
//         data: {
//           data:{
//             error_message: 'duplicate request'
//           }
//         },
//       }
//     }});
//   }
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

/** Interceptors for catch ERROR request
* */
axios.interceptors.response.use(response => response,
  async error => Promise.reject(error.response));
// const originalRequest = error ? error.config : null;
// if (error && error.response && error.response.status && error.response.status === 401
//   && !originalRequest._retry) {
//   return Promise.reject(error);
//   // }
// }
// alert(JSON.stringify(error));

const api = (method, endpoint, body, optionalHeaders) => {
  const options = {
    baseURL,
    endpoint,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...optionalHeaders
    }
  };

  return axios({
    baseURL: options.baseURL,
    headers: options.headers,
    timeout: 20000,
    ...optionalHeaders,
    method: options.method,
    url: options.endpoint,
    data: method === 'GET' ? undefined : body
  });
};

export const apiRequest = (method, endpoint, body, optionalHeaders = {}) => api(method, endpoint, body, optionalHeaders)
  // eslint-disable-next-line consistent-return
  .then((res) => {
    if (checkResponse(res)) {
      return res;
    }
    Promise.reject();
  })
  .catch(err => Promise.reject(err));

export const checkResponse = (res) => {
  if (res.status === HTTP_OK || res.status === 201) {
    return true;
  }
  throw new Error(`${res.statusMessage} - ${res.result.reason}`);
};

export default api;
