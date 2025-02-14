import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = environment.apiUrl + '/api/auth';
    private jwtHelper = new JwtHelperService();
    user: User | undefined = undefined;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    register(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/register`, user);
    }

    login(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, user).pipe(
            map((response: any) => {
                localStorage.setItem('token', response.token);
                this.user = response.user;
            }),
        );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.user = undefined;
        this.router.navigate(['/login'], { queryParams: null });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (token) {
            this.user = this.jwtHelper.decodeToken(token) as User;
        }
        return !!token && !this.jwtHelper.isTokenExpired(token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
