import axios from 'axios';

const BASE_URL = 'http://api.wikishiput.com/entries';

export const entriesClient = axios.create({ baseURL: BASE_URL });

export const removeAuthEntriesToken = () => {
  entriesClient.defaults.headers.common['Authorization'] = '';
  delete entriesClient.defaults.headers.common['Authorization'];
};

export const setAuthEntriesToken = (token) => {
  if (token) {
    entriesClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const getTopEntries = async () => {
  const { data } = await entriesClient.get('/top');
  return data;
};

export const getEntry = async (id) => {
  const { data } = await entriesClient.get(`?id=${id}`);

  return data;
};

export const getAllEntries = async () => {
  const { data } = await entriesClient.get(`/all`);

  return data;
};

export const createEntry = async (entry) => {
  const { data } = await entriesClient.post('', entry);

  return data;
};

export const updateEntry = async (id) => {
  const { data } = await entriesClient.put(`?id=${id}`);

  return data;
};

export const deleteEntry = async (id) => {
  const { data } = await entriesClient.delete(`?id=${id}`);

  return data;
};
