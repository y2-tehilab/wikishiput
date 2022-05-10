import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://api.wikishiput.com/files';

export const filesClient = axios.create({ baseURL: BASE_URL });

export const removeAuthFilesToken = () => {
  filesClient.defaults.headers.common['Authorization'] = '';
  delete filesClient.defaults.headers.common['Authorization'];
};

export const setAuthFilesToken = (token) => {
  if (token) {
    filesClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('formFile', file);
  const headers = {
    Authorization: `Bearer ${Cookies.get('token')}`,
  };
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: headers,
    body: formData,
  });
  const data = await response.json();

  return data;
};
