import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SessionService {
  private logger = new BehaviorSubject<boolean>(this.isAuth());

  constructor() {
  }

  /**
   * Stores user json object ot local storage
   * @param user
   */
  create(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.logger.next(this.isAuth());
  }

  /**
   * Destroy user object from local storage and redirects to login
   */
  destroy() {
    localStorage.removeItem('user');
    this.logger.next(this.isAuth());
  }

  /**
   * Fetch user information from local storage
   * @returns {string|any|null}
   */
  getUser() {
    return localStorage.getItem('user') || null;
  }

  isAdmin() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var admin = JSON.parse(data).user;
    return (admin) ? admin.isAdmin : "";
  }

  getusername() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data).user;
    return user.username;

  }

  /**
   * Fetch token from local storage
   * @returns {any}
   */
  getSessionToken() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    let session = JSON.parse(data).user;

    return (session && session.token) ? session.token : null;
  }

  getUserId() {
    let data = localStorage.getItem('user');
    if (!data) return null;
    var user = JSON.parse(data).user;
    return (user) ? user._id : "";
  }



  /**
   * Check if user is authenticated, this is based on token property in localStorage
   * @returns {any}
   */
  isAuthenticated(): Observable<boolean> {
    return this.logger.asObservable();
  }

  public isAuth(): boolean {
    let data = localStorage.getItem('user');
    if (!data) return false;
    var session = JSON.parse(data);
    return (session && session.token);
  }
}
