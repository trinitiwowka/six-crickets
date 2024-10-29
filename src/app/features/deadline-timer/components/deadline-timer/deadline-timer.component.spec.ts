import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineTimerComponent } from './deadline-timer.component';
import {HttpClientModule} from '@angular/common/http';

describe('DeadlineTimerComponent', () => {
  let component: DeadlineTimerComponent;
  let fixture: ComponentFixture<DeadlineTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeadlineTimerComponent, DeadlineTimerComponent, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadlineTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
