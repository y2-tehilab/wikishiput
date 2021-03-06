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

export const createSection = async (name) => {
  const { data } = await entriesClient.post('/createSection', { name });

  return data;
};

export const updateEntry = async (entry) => {
  const { data } = await entriesClient.put(``, entry);

  return data;
};

export const deleteEntry = async (id) => {
  const { data } = await entriesClient.delete(`?id=${id}`);

  return data;
};

export const getStatisticTypes = async () => {
  const { data } = await entriesClient.get(`/getStatisticTypes`);

  return data;
};

export const createStatisticType = async (name) => {
  const { data } = await entriesClient.post(`/createStatisticType`, { name });

  return data;
};

export const getRankTypes = async () => {
  const { data } = await entriesClient.get(`/getRankTypes`);

  return data;
};

export const createRankType = async (name) => {
  const { data } = await entriesClient.post(`/createRankType`, { name });

  return data;
};

export const rankEntry = async (rank) => {
  const { data } = await entriesClient.post(`/rankEntry`, rank);

  return data;
};
