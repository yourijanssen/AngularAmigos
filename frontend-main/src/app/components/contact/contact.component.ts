/**
 * @author Vincent Obahiagbon
 */

import { Component, OnInit } from '@angular/core';
import { classType } from '../alert/alert.component';
// import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
    title = '';
    name = '';
    email = '';
    message = '';
    public cssClass: classType = classType.error;
    public errorMessage: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    ngOnInit() {
        this.initContactListener();
    }

    private initContactListener() {
        document.getElementById('contact-form')?.addEventListener('submit', this.contactForm.bind(this));
    }

    private async contactForm(event: SubmitEvent) {
        event.preventDefault();

        const contactdetails = {
            title: this.title,
            name: this.name,
            email: this.email,
            message: this.message,
        };

        let fetchResult: Response;
        console.log(contactdetails);
        try {
            fetchResult = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactdetails),
            });

            if (fetchResult.status === 200) {
                const json = await fetchResult.json();
                console.log(json);
                this.cssClass = classType.success;
                this.errorMessage = 'Contact form submitted successfully! You will be redirected in 3 2 1...';
                setTimeout(() => {
                    window.location.href = '/home';
                }, 3000);
            } else if (fetchResult.status === 400) {
                console.log('error 400');
                this.cssClass = classType.error;
                this.errorMessage = 'Invalid contact data, check your input';
                // Handle error status
            }
        } catch (error) {
            console.log(error, 'error');
            this.cssClass = classType.error;
            this.errorMessage = 'Error contacting server';
            // Handle error
        }
    }
}
