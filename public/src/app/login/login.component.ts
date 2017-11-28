import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthService } from '../_services/index';
import { SessionService, HttpService } from '../_core/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  error: any;
  returnUrl: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _AuthService: AuthService,
    private _AlertService: AlertService,
    private _SesionService: SessionService,
  ) {

  }
  ngOnInit() {
  }

  login() {
    this._AuthService.login(this.user.username, this.user.password)
      .subscribe(
      data => {
        this._SesionService.create(data);
        this._router.navigate(['/dashboard']);
      },
      error => {
        this.error = JSON.parse(error._body);
        this._AlertService.error('Wrong username or password' + error);
      });
  }


}


