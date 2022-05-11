import {
  getUserDetails,
  login,
  register,
  setAuthToken,
  removeAuthToken,
} from '../services/api/';
import Cookies from 'js-cookie';
import { action, makeAutoObservable, observable } from 'mobx';

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

  async getUserData() {
    try {
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
