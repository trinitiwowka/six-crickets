import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

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
}
