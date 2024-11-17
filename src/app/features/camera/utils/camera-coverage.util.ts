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
  const sortedRanges: Range[] = cameraRanges.sort((a, b) => a[0] - b[0]);

  let currentMin: number = requiredMin;

  for (const [rangeMin, rangeMax] of sortedRanges) {
    if (rangeMin > currentMin) {
      // gap
      return false;
    }
    currentMin = Math.max(currentMin, rangeMax);

    if (currentMin >= requiredMax) {
      return true;
    }
  }

  return false;
};


export function isCoverageSufficient(desiredSpecs: DesiredSpecs, hardwareCameras: CameraSpecs[]): boolean {
  const { requiredDistanceRange, requiredLightRange } = desiredSpecs;

  // Group cameras by their distance ranges and collect light ranges
  const combinedCameras: { distanceRange: Range; lightRanges: Range[] }[] = [];

  hardwareCameras.forEach((camera) => {
    const existing = combinedCameras.find(
      (c) => c.distanceRange[0] === camera.distanceRange[0] && c.distanceRange[1] === camera.distanceRange[1]
    );

    if (existing) {
      // Add light range to existing group
      existing.lightRanges.push(camera.lightRange);
    } else {
      // Create a new group for the distance range
      combinedCameras.push({
        distanceRange: [...camera.distanceRange],
        lightRanges: [[...camera.lightRange]],
      });
    }
  });

  // Filter groups that fully cover the required light range
  const validCameras = combinedCameras.filter((group) =>
    isRangeCovered(requiredLightRange, group.lightRanges)
  );

  if (validCameras.length === 0) {
    // If no cameras cover the required light range, return false
    return false;
  }

  // Extract distance ranges from valid groups
  const distanceRanges: Range[] = validCameras.map((group) => group.distanceRange);

  // Check if the required distance range is covered
  return isRangeCovered(requiredDistanceRange, distanceRanges);
}

