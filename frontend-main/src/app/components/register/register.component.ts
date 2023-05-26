/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * @author Lars Brinker
 */
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { classType } from '../alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    constructor(
        private registerService: RegisterService,
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {}
    public submitted = false;
    public cssClass: classType = classType.error;
    public errorMessage: string | null = null;
    /*
     * Create a formgroup so it is easier to work with all the input fields.
     */
    public registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                this.createPasswordStrengthValidator(/[A-Z]/, { hasCapitalCase: true }),
                this.createPasswordStrengthValidator(/[a-z]/, { hasLowerCase: true }),
                this.createPasswordStrengthValidator(/[0-9]/, { hasNumber: true }),
                this.createPasswordStrengthValidator(/[#?!@$%^&*-]/, { hasSpecialCharacter: true }),
            ],
        ],
    });

    /**
     * This function gets called when the form is submitted.
     */
    public onSubmit(): void {
        if (this.registerForm.valid) {
            this.registerService.registerUser(this.registerForm).subscribe({
                next: (response) => {
                    this.cssClass = classType.success;
                    this.errorMessage = response.data.post.message;
                    setTimeout(() => {
                        this.loginService.login();
                        this.router.navigate(['/home']);
                    }, 1500);
                },
                error: (e: HttpErrorResponse) => {
                    console.log('error');
                    this.cssClass = classType.error;
                    this.errorMessage = e.error?.data.post.message;
                },
            });
        }
    }

    /**
     * Getters for the different input fields, which makes calling them in the html easier.
     */

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
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
