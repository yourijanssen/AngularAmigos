import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountOfResultsDropdownComponent } from './amount-of-results-dropdown.component';

describe('AmountOfResultsDropdownComponent', () => {
  let component: AmountOfResultsDropdownComponent;
  let fixture: ComponentFixture<AmountOfResultsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountOfResultsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountOfResultsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
