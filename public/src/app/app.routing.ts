import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule,RouterLinkActive } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from "./_core/index";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoldersComponent } from './folders/folders.component';
import { BaseComponent } from './base/base.component';
import { ListusersComponent } from './listusers/listusers.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: BaseComponent,
                 canActivateChild: [AuthGuard],
            },
            {
                path: 'folder',
                component: FoldersComponent,
                     canActivateChild: [AuthGuard],
            },
            {
                path: 'list',
                component: ListusersComponent,
                     canActivateChild: [AuthGuard],
            },
        ]
    },
    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });