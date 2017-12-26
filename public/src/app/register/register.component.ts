import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../_services/index';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  error: any;
  loading: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _AlertService: AlertService,

  ) { }

  ngOnInit() {
  }
  register() {
    this._userService.register(this.user)
      .subscribe(
      data => {
        this._AlertService.success('Registration successful', true);
        this._router.navigate(['/login']);
      },
      error => {
        this.error = JSON.parse(error._body);
        this._AlertService.error('Username already exist' + error);
      });
  }
}


