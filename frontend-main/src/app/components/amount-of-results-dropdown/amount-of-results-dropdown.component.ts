import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-amount-of-results-dropdown',
    templateUrl: './amount-of-results-dropdown.component.html',
    styleUrls: ['./amount-of-results-dropdown.component.css'],
})
export class AmountOfResultsDropdownComponent {
    @Output() public changeAmountOfResults: EventEmitter<number> = new EventEmitter<number>();

    public onChangeAmountOfResults(value: string): void {
        this.changeAmountOfResults.emit(+value);
    }
}
