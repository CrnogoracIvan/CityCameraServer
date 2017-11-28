import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/index';
import { SessionService } from '../_core/index';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any = {};
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _AlertService: AlertService,
    private _SesionService: SessionService,

  ) { }

  ngOnInit() {
    this.users = JSON.parse(this._SesionService.getUser());

  }

  logout() {
    this._SesionService.destroy();
    this._router.navigate(['/login']);
  }
}
