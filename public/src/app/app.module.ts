import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend, BrowserXhr } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//tabs
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';


import { routing } from './app.routing';
import { HttpService, SessionService, AuthGuard } from './_core/index';
import { AuthService, UserService, AlertService, FolderService } from './_services/index';


import { AlertComponent,ModalComponent } from './_directives/index';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoldersComponent } from './folders/folders.component';
import { BaseComponent } from './base/base.component';
import { ListusersComponent } from './listusers/listusers.component';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions, sessionService: SessionService) {
  return new HttpService(backend, options, sessionService);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AlertComponent,
    FoldersComponent,
    BaseComponent,
    ListusersComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgProgressModule
  ],
  providers: [
    AuthService,
    UserService,
    AlertService,
    AuthGuard,
    SessionService,
    FolderService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, SessionService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
