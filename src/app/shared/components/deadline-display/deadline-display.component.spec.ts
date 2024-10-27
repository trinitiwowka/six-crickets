import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineDisplayComponent } from './deadline-display.component';

describe('DeadlineDisplayComponent', () => {
  let component: DeadlineDisplayComponent;
  let fixture: ComponentFixture<DeadlineDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeadlineDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadlineDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
