import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraDemoPageComponent } from './camera-demo-page.component';
import { FormBuilder } from '@angular/forms';

describe('CameraDemoPageComponent', () => {
  let component: CameraDemoPageComponent;
  let fixture: ComponentFixture<CameraDemoPageComponent>;
  let fb: FormBuilder;


  beforeEach(async () => {
    fb = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [CameraDemoPageComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: fb
        }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CameraDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
