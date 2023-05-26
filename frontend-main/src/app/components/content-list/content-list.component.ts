import { Component, Input, OnInit } from '@angular/core';
import { JSend } from 'src/app/models/communication';
import { Content } from 'src/app/models/content';
import { ContentService } from 'src/app/services/content.service';

@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.css'],
})
export class ContentListComponent implements OnInit {
    public previousContentLength?: number = 0;
    @Input() public amountOfResults!: number;
    public content: Content[] = [];

    constructor(private contentService: ContentService) {}

    ngOnInit(): void {
        this.getContent(this.amountOfResults, this.content.length);
    }

    public getContent(limit: number, offset: number): void {
        this.contentService
            .getContent(limit, offset)
            .subscribe((content: JSend<Content[]>) => (this.content = this.content.concat(content.data.post)));
    }

    public loadMoreContent(): void {
        this.previousContentLength = this.content.length;
        this.getContent(this.amountOfResults, this.content.length);
        console.log(this.content);
    }
}
