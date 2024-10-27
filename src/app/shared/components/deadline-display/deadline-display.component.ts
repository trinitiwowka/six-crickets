import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-deadline-display',
  standalone: true,
  imports: [],
  templateUrl: './deadline-display.component.html',
  styleUrls: ['./deadline-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlineDisplayComponent {
  @Input() secondsLeft: number = 0;
  // private intervalId: any;
  //
  // constructor(private cdr: ChangeDetectorRef) {}

  // ngOnChanges(): void {
  //   this.startCountdown();
  // }
  //
  // startCountdown(): void {
  //   if (this.secondsLeft <= 0) return;
  //
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  //
  //   this.intervalId = setInterval(() => {
  //     if (this.secondsLeft > 0) {
  //       this.secondsLeft--;
  //     } else {
  //       clearInterval(this.intervalId);
  //     }
  //     this.cdr.markForCheck();
  //   }, 1000);
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId); // Очистка таймера при уничтожении компонента
  //   }
  // }
}
