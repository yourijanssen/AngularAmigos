import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/testObject';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
    public testObject!: Test;

    constructor(private testService: TestService) {}

    public ngOnInit(): void {
        this.getTest();
    }

    /**
     * Gets a test object from the backend to test if the connection works.
     * @author Thijs van Rixoort
     */
    private async getTest(): Promise<void> {
        this.testObject = await this.testService.getTest();
    }
}
