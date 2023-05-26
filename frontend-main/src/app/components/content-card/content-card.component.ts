import { Component, Input } from '@angular/core';
import { Content } from 'src/app/models/content';

@Component({
    selector: 'app-content-card',
    templateUrl: './content-card.component.html',
    styleUrls: ['./content-card.component.css'],
})
export class ContentCardComponent implements Content {
    @Input() public id!: number;
    @Input() public userID!: number;
    @Input() public title!: string;
    @Input() public text!: string;
    @Input() public tags: string[] = ['bla', 'bla'];
    @Input() public uploadDate!: string;
    @Input() public imagePath!: string;
}
