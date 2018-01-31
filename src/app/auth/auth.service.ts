import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http: Http) {

  }

  authenticateUser(email: string) {
    const body = {
      email: email
    };
    return this.http.post('http://localhost:3000/auth', body);
  }
  verifyOTP(otp: string) {
    const body = {
      otp : otp
    };
    return this.http.post('http://localhost:3000/verify', body);
  }

  isAuthenticated() {
    return this.getToken() === 'null';
  }

  onLogout() {
    localStorage.setItem('adhaar_token', null);
  }

  getToken() {
    return localStorage.getItem('adhaar_token');
  }
}
