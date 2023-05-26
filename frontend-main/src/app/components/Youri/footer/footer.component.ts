/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
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
