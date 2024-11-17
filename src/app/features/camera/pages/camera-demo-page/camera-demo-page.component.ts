import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CameraSpecs, DesiredSpecs, isCoverageSufficient} from '../../utils/camera-coverage.util';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-camera-demo-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './camera-demo-page.component.html',
  styleUrl: './camera-demo-page.component.css'
})
export class CameraDemoPageComponent {
  coverageForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.coverageForm = this.fb.group({
      requiredDistanceRangeMin: [1],
      requiredDistanceRangeMax: [10],
      requiredLightRangeMin: [100],
      requiredLightRangeMax: [1000],
      cameras: this.fb.array([
        this.fb.group({ distanceMin: [0], distanceMax: [5], lightMin: [50], lightMax: [500] }),
        // this.fb.group({ distanceMin: [5], distanceMax: [15], lightMin: [500], lightMax: [1500] })
      ])
    });
  }

  checkCoverage(): void {
    const formValues = this.coverageForm.value;
    const desiredSpecs: DesiredSpecs = {
      requiredDistanceRange: [formValues.requiredDistanceRangeMin, formValues.requiredDistanceRangeMax],
      requiredLightRange: [formValues.requiredLightRangeMin, formValues.requiredLightRangeMax],
    };

    const hardwareCameras: CameraSpecs[] = formValues.cameras.map((camera: any) => ({
      distanceRange: [camera.distanceMin, camera.distanceMax],
      lightRange: [camera.lightMin, camera.lightMax]
    }));

    const result: boolean | null = isCoverageSufficient(desiredSpecs, hardwareCameras);

    alert(`Coverage is ${result ? 'sufficient' : 'insufficient'}`);
  }

  get cameras(): FormArray {
    return this.coverageForm.get('cameras') as FormArray;
  }

  addCamera(): void {
    const camerasControl = this.coverageForm.get('cameras');
    if (camerasControl instanceof FormArray) {
      camerasControl.push(this.fb.group({
        distanceMin: new FormControl(0),
        distanceMax: new FormControl(0),
        lightMin: new FormControl(0),
        lightMax: new FormControl(0),
      }));
    }
  }
}
