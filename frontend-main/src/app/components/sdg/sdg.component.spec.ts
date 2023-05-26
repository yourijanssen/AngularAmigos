import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SDGComponent } from './sdg.component';

describe('SDGComponent', () => {
  let component: SDGComponent;
  let fixture: ComponentFixture<SDGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SDGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SDGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
