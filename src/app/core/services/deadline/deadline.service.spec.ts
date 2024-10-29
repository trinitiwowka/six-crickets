import { TestBed } from '@angular/core/testing';
import { DeadlineService } from './deadline.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeadlineService', () => {
  let service: DeadlineService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'ApiService', useValue: spy }]
    });
    service = TestBed.inject(DeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
