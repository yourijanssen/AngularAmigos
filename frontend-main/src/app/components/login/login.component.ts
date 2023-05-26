/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * @author Lars Brinker
 */
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { classType } from '../alert/alert.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public submitted = false;
    public cssClass: classType = classType.error;
    public errorMessage: string | null = null;

    constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {}
    // Create a formgroup so it is easier to work with all the input fields.
    public loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    public submit() {
        if (this.loginForm.valid) {
            this.loginService.getLogin(this.loginForm).subscribe({
                next: (response) => {
                    this.cssClass = classType.success;
                    this.errorMessage = response.data.post.message;
                    setTimeout(() => {
                        this.loginService.login();
                        this.router.navigate(['/home']);
                    }, 1500);
                },
                error: (e: HttpErrorResponse) => {
                    this.cssClass = classType.error;
                    this.errorMessage = e.error?.data.post.message;
                },
            });
        }
    }

    /**
     * Getters for the different input fields, which makes calling them in the html easier.
     */

    public get email() {
        return this.loginForm.get('email');
    }

    public get password() {
        return this.loginForm.get('password');
    }

    /**
     * @param regex That a regular expression
     * @returns An validator function, which takes an  Angular control object and
     * returns either null if the control value is valid or a validation error object.
     */
    public createPasswordStrengthValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);
            // if true, return no error , else return error passed in the second parameter
            return valid ? null : error;
        };
    }
}
