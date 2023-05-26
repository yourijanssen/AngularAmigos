import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JSend } from '../models/communication';
import { Observable } from 'rxjs';
import { User } from '../models/testObject';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private registerUrl = 'http://localhost:3000/register/';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) {}

    public registerUser(
        registerForm: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null> }>
    ): Observable<JSend<User>> {
        const body = {
            email: registerForm.get('email')?.value,
            password: registerForm.get('password')?.value,
        };
        return this.http.post<JSend<User>>(this.registerUrl, body, { withCredentials: true });
    }
}
