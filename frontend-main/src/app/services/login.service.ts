/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSend } from '../models/communication';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/testObject';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private loginUrl = 'http://localhost:3000/session/';
    private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {}

    public getLogin(
        loginForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>
    ): Observable<JSend<User>> {
        const body = {
            email: loginForm.get('email')?.value,
            password: loginForm.get('password')?.value,
        };
        return this.http.post<JSend<User>>(this.loginUrl, body, { withCredentials: true });
    }

    public logOut(): Observable<JSend<User>> {
        this.isLoggedIn.next(false);
        return this.http.delete<JSend<User>>(this.loginUrl, { withCredentials: true });
    }

    // Getter and setter for the logged in variable, so any component can call this and check if the user is logged in.
    public get isLoggedIn(): BehaviorSubject<boolean> {
        return this._isLoggedIn;
    }

    public set isLoggedIn(value: BehaviorSubject<boolean>) {
        this._isLoggedIn = value;
    }

    // public logout() {
    //     this.isLoggedIn.next(false);
    // }

    public login() {
        this.isLoggedIn.next(true);
    }
}
