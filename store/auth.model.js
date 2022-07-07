import {
  getUserDetails,
  login,
  register,
  setAuthToken,
  removeAuthToken,
} from '../services/api/';
import Cookies from 'js-cookie';
import { action, makeAutoObservable, observable } from 'mobx';
import { v4 as uuid } from 'uuid';

export class AuthModel {
  user;

  get isLoggedIn() {
    return !!this.user;
  }

  setUser = (user) => {
    this.user = user;
  };

  constructor() {
    this.setUser(null);
    makeAutoObservable(
      this,
      {
        user: observable,
        setUser: action,
        getUserData: action,
        logout: action,
        login: action,
        register: action,
        userAuthenticateSucceed: action,
      },
      { autoBind: true }
    );
  }

  setSessionId() {
    const sessionId = Cookies.get('session-id');
    if (!sessionId) {
      Cookies.set('session-id', uuid());
    }
  }

  async getUserData() {
    try {
      this.setSessionId();
      const token = Cookies.get('token');
      setAuthToken(token);
      const user = await getUserDetails();
      this.setUser(user);
    } catch {
      this.logout();
    }
  }

  async logout() {
    this.setUser(null);
    Cookies.remove('token');
    removeAuthToken();
  }

  async login(email, password) {
    const user = await login({ email, password });
    this.userAuthenticateSucceed(user);
  }

  async register(email, name, password, confirmPassword) {
    const user = await register({ email, name, password, confirmPassword });
    this.userAuthenticateSucceed(user);
  }

  userAuthenticateSucceed(user) {
    setAuthToken(user.token);
    Cookies.set('token', user.token);
    this.setUser(user);
  }
}
