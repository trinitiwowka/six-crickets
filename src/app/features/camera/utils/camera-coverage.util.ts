export type Range = [number, number];

export interface CameraSpecs {
  distanceRange: Range;
  lightRange: Range;
}

export interface DesiredSpecs {
  requiredDistanceRange: Range;
  requiredLightRange: Range;
}

const isRangeCovered = (requiredRange: Range, cameraRanges: Range[]): boolean => {
  const [requiredMin, requiredMax] = requiredRange;
  const sortedRanges: Range[] = cameraRanges.sort((a: Range, b: Range): number => a[0] - b[0]);

  let currentMin: number = requiredMin;

  for (const [rangeMin, rangeMax] of sortedRanges) {
    if (rangeMin <= currentMin && currentMin <= rangeMax) {
      currentMin = rangeMax;
    }

    if (currentMin >= requiredMax) {
      return true;
    }
  }

  return false;
};

export function isCoverageSufficient(desiredSpecs: DesiredSpecs, hardwareCameras: CameraSpecs[]): boolean {
  const { requiredDistanceRange, requiredLightRange } = desiredSpecs;

  const distanceRanges: Range[] = hardwareCameras.map(camera => camera.distanceRange);
  const lightRanges: Range[] = hardwareCameras.map(camera => camera.lightRange);

  const isDistanceCovered: boolean = isRangeCovered(requiredDistanceRange, distanceRanges);
  const isLightCovered: boolean = isRangeCovered(requiredLightRange, lightRanges);

  return isDistanceCovered && isLightCovered;
}
