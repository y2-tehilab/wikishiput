import { makeAutoObservable } from 'mobx';
import { AuthModel } from './auth.model';

export class RootModel {
  auth;

  constructor() {
    makeAutoObservable(this);
    this.auth = new AuthModel(this);
  }
}
