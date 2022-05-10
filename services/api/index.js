import { setAuthUserToken, removeAuthUserToken } from './auth';
import { setAuthFilesToken, removeAuthFilesToken } from './files';
import { setAuthEntriesToken, removeAuthEntriesToken } from './entries';

export const setAuthToken = (token) => {
  setAuthUserToken(token);
  setAuthEntriesToken(token);
  setAuthFilesToken(token);
};

export const removeAuthToken = () => {
  removeAuthUserToken();
  removeAuthEntriesToken();
  removeAuthFilesToken();
};

export * from './entries';

export * from './auth';
