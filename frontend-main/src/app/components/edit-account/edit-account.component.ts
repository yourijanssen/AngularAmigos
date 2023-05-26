import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JSend } from 'src/app/models/communication';
import { classType } from '../alert/alert.component';

interface EditAccountFormData {
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.component.html',
    styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
    username = '';
    firstName = '';
    middleName = '';
    lastName = '';
    backendUrl = 'http://localhost:3000/edit-account/';
    feedbackMessage = '';
    public cssClass: classType = classType.error;
    values: EditAccountFormData = { username: '', firstName: '', middleName: '', lastName: '' };
    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.getAccountData();
    }

    public onSave(form: NgForm): void {
        const value = form.value as EditAccountFormData;
        this.values = value;
        if (this.valuesNotChanged()) {
            this.sendChangeRequest();
        } else {
            this.feedbackMessage = 'There are no changes to save.';
            console.log('No changes');
        }
    }

    private getAccountData(): void {
        this.http.get<JSend<EditAccountFormData>>(this.backendUrl, { withCredentials: true }).subscribe((results) => {
            this.username = results.data.post.username;
            this.firstName = results.data.post.firstName;
            this.middleName = results.data.post.middleName;
            this.lastName = results.data.post.lastName;
        });
    }

    private valuesNotChanged(): boolean {
        return !(
            this.values.username === this.username &&
            this.values.firstName === this.firstName &&
            this.values.middleName === this.middleName &&
            this.values.lastName === this.lastName
        );
    }

    private sendChangeRequest(): void {
        console.log('Changing details');
        this.http
            .put<JSend<string>>(this.backendUrl, this.values, { withCredentials: true })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 409) {
                        this.feedbackMessage = 'This username is already in use. Please pick a different one.';
                    }
                    return throwError(() => {
                        return new Error('This username is already in use.');
                    });
                })
            )
            .subscribe((results) => {
                console.log(results.data.post);
                if (results.status === 'fail') {
                    this.feedbackMessage = 'Somehow, the request failed.';
                } else {
                    this.cssClass = classType.success;
                    this.feedbackMessage = 'Your changes have been saved. You will now be redirected.';
                    setTimeout(() => {
                        this.router.navigate(['/account']);
                    }, 2000);
                }
            });
    }
}
