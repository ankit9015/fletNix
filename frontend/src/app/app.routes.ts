import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { authGuard } from './guards/auth.guard';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'shows', component: ShowListComponent, canActivate: [authGuard] },
    {
        path: 'shows/:showId',
        component: ShowDetailComponent,
        canActivate: [authGuard],
    },
    { path: '', redirectTo: '/shows', pathMatch: 'full' },
    { path: 'error', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/error' },
];
