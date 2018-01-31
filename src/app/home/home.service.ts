import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class HomeService {
  constructor(private http: Http, public authService: AuthService) {

  }

  getDetails() {
    const token = this.authService.getToken();
    return this.http.get('http://localhost:3000/?token=' + token);
  }

  updateValues(name: string, phone: string) {
    const token = this.authService.getToken();
    const body = {
      name: name,
      phone: phone,
      token : token
    };
    return this.http.post('http://localhost:3000/update', body);
  }

  onLogout() {
    localStorage.setItem('wowsome_token', null);
    localStorage.setItem('user_id', null);
  }

  getToken() {
    return localStorage.getItem('wowsome_token');
  }
}
