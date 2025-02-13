import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
    selector: 'app-navbar',
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    constructor(public authService: AuthService) {}
    logout() {
        this.authService.logout();
    }
}
