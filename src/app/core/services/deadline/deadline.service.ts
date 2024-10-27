import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import {DeadlinePayload} from './deadline.model';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private readonly endpoint = '/api/deadline';

  constructor(private apiService: ApiService) {}

  getDeadline(): Observable<DeadlinePayload> {
    return this.apiService.get<DeadlinePayload>(this.endpoint);
  }
}
