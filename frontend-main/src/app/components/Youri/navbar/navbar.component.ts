/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    constructor(private loginService: LoginService, private router: Router) {}
    public loggedIn: boolean = false;

    ngOnInit() {
        this.loginService.isLoggedIn.subscribe({
            next: (v) => (this.loggedIn = v),
        });
    }

    public logOut(): void {
        this.loginService.logOut().subscribe({});
        this.router.navigate(['/home']);
    }
}
