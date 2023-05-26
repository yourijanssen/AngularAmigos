import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JSend } from 'src/app/models/communication';

interface AccountFormData {
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    followers: number;
    follows: number;
    projects: number;
    email: string;
    yourAccount: boolean;
    subscribed: boolean;
}

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    public loggedIn = true;
    private backendUrl = 'http://localhost:3000/account/';
    public username = '';
    public firstName = ' ';
    public middleName = '';
    public lastName = '';
    public followers = 0;
    public follows = 0;
    public projects = 0;
    public email = 'Casper@hva.nl';
    public yourAccount = false;
    public follow = 'follow';
    public exists = true;

    constructor(private http: HttpClient, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const usernameParameter = this.route.snapshot.params['username'];
        if (usernameParameter) {
            this.username = usernameParameter;
        }
        this.getAccountData();
    }

    public onFollow(): void {
        if (this.follow === 'follow') {
            this.http
                .get<JSend<string>>('http://localhost:3000/follow/' + this.username, { withCredentials: true })
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        return throwError(() => {
                            console.log(error);
                            return new Error('You are already subscribed.');
                        });
                    })
                )
                .subscribe((results) => {
                    if (results.status === 'succes') {
                        this.follow = 'unfollow';
                        console.log(results.data.post);
                    }
                });
        } else {
            this.http
                .delete<JSend<string>>('http://localhost:3000/follow/unfollow/' + this.username, {
                    withCredentials: true,
                })
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        return throwError(() => {
                            console.log(error);
                            return new Error('You are not subscribed.');
                        });
                    })
                )
                .subscribe((results) => {
                    if (results.status === 'succes') {
                        console.log(results.data.post);
                        this.follow = 'follow';
                    }
                });
        }
    }

    private getAccountData(): void {
        this.http
            .get<JSend<AccountFormData>>(this.backendUrl + this.username, { withCredentials: true })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 404) {
                        this.exists = false;
                    }
                    return throwError(() => {
                        return new Error('This username does not exist.');
                    });
                })
            )
            .subscribe((results) => {
                if (results.status === 'succes') {
                    this.username = results.data.post.username;
                    this.firstName = results.data.post.firstName;
                    this.middleName = results.data.post.middleName;
                    this.lastName = results.data.post.lastName;
                    this.followers = results.data.post.followers;
                    this.follows = results.data.post.follows;
                    this.projects = results.data.post.projects;
                    this.email = results.data.post.email;
                    this.yourAccount = results.data.post.yourAccount;
                    if (results.data.post.subscribed) {
                        this.follow = 'unfollow';
                    }
                }
            });
    }
}
