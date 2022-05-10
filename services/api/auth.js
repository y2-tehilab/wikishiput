import axios from 'axios';

const BASE_URL = 'http://api.wikishiput.com/users';

export const authClient = axios.create({ baseURL: BASE_URL });

export const removeAuthUserToken = () => {
  authClient.defaults.headers.common['Authorization'] = '';
  delete authClient.defaults.headers.common['Authorization'];
};

export const setAuthUserToken = (token) => {
  if (token) {
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const getUserDetails = async () => {
  const { data } = await authClient.get('/getUser');
  return data;
};

export const register = async (user) => {
  const { data } = await authClient.post('/register', user);
  return data;
};

export const login = async (user) => {
  const { data } = await authClient.post('/login', user);
  return data;
};
