import { Injectable } from '@angular/core';

import { HttpService } from "../_core/index";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    apiUrl: string = environment.apiUrl;

    constructor(private http: HttpService) { }

    login(username: string, password: string) {
        return this.http.post(this.apiUrl + '/user/login', { username: username, password: password })
            .map((res) => res.json());
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
}
