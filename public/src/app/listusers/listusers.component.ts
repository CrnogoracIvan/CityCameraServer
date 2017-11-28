import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import { SessionService, HttpService } from '../_core/index';
import { User } from '../_model/index';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  users: any = {};
  listUsers: any[];
  error: any;
  loading: boolean = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _UserService: UserService,
    private _AlertService: AlertService,
    private _SesionService: SessionService,

  ) {
    this.users = JSON.parse(this._SesionService.getUser());

  }

  ngOnInit() {
    this.getAllUsers();

  }

  private getAllUsers() {
    this._UserService.getAllUsers().subscribe(data => {
      this.listUsers = data;
    });
  }
  update(user, i) {
    user.isAdmin = !user.isAdmin;
    this._UserService.update(user).subscribe(data => {
      this.listUsers[i] = data;
    }, error => {
      this.error = JSON.parse(error._body);
      this._AlertService.error('Something went wrong' + error);

    });
  }

  trackByFn(index, item) {
    return index;
  }

}

