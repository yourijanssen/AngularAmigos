import { Component } from '@angular/core';
// import { ContentListComponent } from '../content-list/content-list.component';
interface Content {
    title: string;
    message: string;
    tags: string[];
    date: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    public amountOfResults = 10;
    public contentLenght?: number;

    public setAmountOfResults(amountOfResults: number): void {
        this.amountOfResults = amountOfResults;
    }
}
