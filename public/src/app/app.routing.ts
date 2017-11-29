import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
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
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: BaseComponent,
                    },
                    {
                        path: 'folder',
                        component: FoldersComponent,

                    },
                    {
                        path: 'list',
                        component: ListusersComponent,

                    }
                ]
            }
        ]
    },
    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
