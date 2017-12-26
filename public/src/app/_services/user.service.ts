import { Injectable } from '@angular/core';
import { HttpService} from "../_core/index";
import { environment } from '../../environments/environment';
import { User } from '../_model/index';

@Injectable()
export class UserService {
    apiUrl: string = environment.apiUrl;


    constructor(private http: HttpService) { }

    getAllUsers() {
        return this.http.get(this.apiUrl + '/user/list').map((res) => res.json());
    }
    register(user: User) {
        return this.http.post(this.apiUrl + '/user/register', user).map((res) => res.json());
    }

    update(user: User) {
        return this.http.put('/user/' + user._id, user);
    }
}