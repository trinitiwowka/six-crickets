import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {DeadlineService} from '../../../../core/services/deadline/deadline.service';
import {
  catchError, endWith,
  forkJoin,
  interval,
  map,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  timer
} from 'rxjs';
import {AsyncPipe, NgIf, NgTemplateOutlet} from '@angular/common';
import {SkeletonLoaderComponent} from '../../../../shared/components/skeleton-loader/skeleton-loader.component';
import {MIN_LOADING_TIME} from '../../../../core/constants';
import {DeadlineDisplayComponent} from '../../../../shared/components/deadline-display/deadline-display.component';

@Component({
  selector: 'app-deadline-timer',
  standalone: true,
  imports: [
    DeadlineDisplayComponent,
    AsyncPipe,
    NgIf,
    SkeletonLoaderComponent,
    NgTemplateOutlet
  ],
  templateUrl: './deadline-timer.component.html',
  styleUrl: './deadline-timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineTimerComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  secondsLeft: number = 0;
  hasError: boolean = false;
  isLoading: boolean = true;

  constructor(private deadlineService: DeadlineService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    forkJoin([
      this.deadlineService.getDeadline(),
      timer(MIN_LOADING_TIME)
    ]).pipe(
      switchMap(([data]) => {
        this.isLoading = false;
        const initialSeconds = data?.payload?.secondsLeft || 0;
        return interval(1000).pipe(
          startWith(-1),
          map(tick => Math.max(initialSeconds - (tick + 1), 0)),
          tap((value)=> {
            this.secondsLeft = value;
            this.cdr.markForCheck();
          }),
          takeUntil(this.destroyed),
          takeWhile(value => value > 0, true),
          endWith(0)
        );
      }),
      catchError((error) => {
        console.error(error);
        this.hasError = true;
        this.isLoading = false;
        return of(0);
      }),
      shareReplay(1),
      takeUntil(this.destroyed),
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
