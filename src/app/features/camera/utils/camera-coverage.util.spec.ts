import {CameraSpecs, DesiredSpecs, isCoverageSufficient} from './camera-coverage.util';

describe('CameraCoverageUtil', () => {
  const targetSpecs: DesiredSpecs = {
    requiredDistanceRange: [1, 10],
    requiredLightRange: [100, 1000],
  };

  const exactMatchCoverage: CameraSpecs[] = [ // true
    {distanceRange: [1, 10], lightRange: [100, 1000]}
  ];

  const coveredIfLightRangeWider: CameraSpecs[] = [
    {distanceRange: [0, 10], lightRange: [10, 1500]}, // Light range is wider, sufficient coverage
  ];

  const coveredIfDistanceRangeWider: CameraSpecs[] = [
    {distanceRange: [0, 15], lightRange: [100, 1000]}, // Distance range is wider, sufficient coverage
  ];

  const multipleCamerasOnlyDistanceFullCoverage: CameraSpecs[] = [ // only distance ranges fully covered, invalid
    {distanceRange: [0, 5], lightRange: [100, 500]},
    {distanceRange: [5, 10], lightRange: [500, 1000]},
  ];

  const singleCameraExactMatch: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 1000]}, // Exact match for light and distance
  ];

  const camerasWithLightGap: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 500]},
    {distanceRange: [1, 10], lightRange: [600, 1000]}, // Gap in light coverage
  ];

  const camerasWithDistanceGap: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 1000]},
    {distanceRange: [6, 10], lightRange: [100, 1000]}, // Gap in distance coverage
  ];

  const camerasFullyOutOfRange: CameraSpecs[] = [
    {distanceRange: [15, 20], lightRange: [2000, 3000]}, // Completely out of required range
  ];

  const multipleIdenticalCameras: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 1000]},
    {distanceRange: [1, 10], lightRange: [100, 1000]}, // Redundant identical cameras
  ];

  const singleCameraLightTooNarrow: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [200, 800]}, // Light range is too narrow
  ];

  const overlappingCamerasMergingLight: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 600]},
    {distanceRange: [1, 10], lightRange: [500, 1000]}, // Merged light range covers the target
  ];

  const overlappingCamerasMergingDistance: CameraSpecs[] = [
    {distanceRange: [1, 6], lightRange: [100, 1000]},
    {distanceRange: [5, 10], lightRange: [100, 1000]}, // Merged distance range covers the target
  ];

  const camerasWithUnalignedRanges: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 500]},
    {distanceRange: [6, 10], lightRange: [600, 1000]}, // Neither light nor distance align
  ];

  const camerasWithAdjacentRanges: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 1000]},
    {distanceRange: [5, 10], lightRange: [100, 1000]}, // Exact alignment, no gaps
  ];

  const wideRangeCamera: CameraSpecs[] = [
    {distanceRange: [0, 15], lightRange: [50, 1500]}, // Single wide-range camera
  ];

  const redundantCamerasWithGaps: CameraSpecs[] = [
    {distanceRange: [0, 5], lightRange: [100, 1000]},
    {distanceRange: [6, 10], lightRange: [100, 1000]}, // Gaps in distance
  ];

  const edgeCaseCamera: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 1000]}, // Perfect match
  ];

  const lightRangeTooWide: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 2000]}, // Excess light range, still valid
  ];

  const partiallyOverlappingCameras: CameraSpecs[] = [
    {distanceRange: [1, 6], lightRange: [100, 700]},
    {distanceRange: [5, 10], lightRange: [600, 1000]}, // Partial overlap, invalid
  ];

  const camerasWithDifferentRanges: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 300]},
    {distanceRange: [6, 10], lightRange: [700, 1000]}, // Separate ranges, invalid
  ];

  const camerasWithMinMaxRanges: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 100]}, // Minimal light range
    {distanceRange: [1, 10], lightRange: [1000, 1000]}, // Exact upper bound
  ];

  const camerasWithCompleteOverlap: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [100, 500]},
    {distanceRange: [1, 10], lightRange: [300, 1000]}, // Full overlap
  ];

  const camerasWithTinyIntervals: CameraSpecs[] = [
    {distanceRange: [1, 2], lightRange: [100, 200]},
    {distanceRange: [2, 3], lightRange: [200, 300]},
    {distanceRange: [3, 10], lightRange: [300, 1000]},
  ];

  const camerasWithIdenticalLightDifferentDistance: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 1000]},
    {distanceRange: [6, 10], lightRange: [100, 1000]},
  ];

  const camerasWithPartialOverlap: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 600]},
    {distanceRange: [4, 10], lightRange: [500, 1000]},
  ];

  const camerasCoveringOnlyLight: CameraSpecs[] = [
    {distanceRange: [15, 20], lightRange: [100, 1000]}, // Out of distance range
  ];

  const camerasCoveringOnlyDistance: CameraSpecs[] = [
    {distanceRange: [1, 10], lightRange: [2000, 3000]}, // Out of light range
  ];

  const camerasCompletelySeparate: CameraSpecs[] = [
    {distanceRange: [1, 5], lightRange: [100, 500]},
    {distanceRange: [6, 10], lightRange: [600, 1000]}, // Completely separate
  ];

  const universalCamera: CameraSpecs[] = [
    {distanceRange: [0, 15], lightRange: [50, 1500]}, // Wide range for both
  ];

  it('should return true for exact match coverage', () => {
    expect(isCoverageSufficient(targetSpecs, exactMatchCoverage)).toBe(true);
  });

  it('should return true for a single camera with wider light range', () => {
    expect(isCoverageSufficient(targetSpecs, coveredIfLightRangeWider)).toBe(true);
  });

  it('should return true for a single camera with wider distance range', () => {
    expect(isCoverageSufficient(targetSpecs, coveredIfDistanceRangeWider)).toBe(true);
  });

  it('should return false for multiple cameras that fully cover only the distance but the lighting is not covered', () => {
    expect(isCoverageSufficient(targetSpecs, multipleCamerasOnlyDistanceFullCoverage)).toBe(false);
  });

  it('should return true for a single camera with exact match', () => {
    expect(isCoverageSufficient(targetSpecs, singleCameraExactMatch)).toBe(true);
  });

  it('should return false for cameras with a gap in light coverage', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithLightGap)).toBe(false);
  });

  it('should return false for cameras with a gap in distance coverage', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithDistanceGap)).toBe(false);
  });

  it('should return false for cameras fully out of range', () => {
    expect(isCoverageSufficient(targetSpecs, camerasFullyOutOfRange)).toBe(false);
  });

  it('should return true for multiple identical cameras', () => {
    expect(isCoverageSufficient(targetSpecs, multipleIdenticalCameras)).toBe(true);
  });

  it('should return false for a single camera with too narrow light range', () => {
    expect(isCoverageSufficient(targetSpecs, singleCameraLightTooNarrow)).toBe(false);
  });

  it('should return true for overlapping cameras merging light ranges', () => {
    expect(isCoverageSufficient(targetSpecs, overlappingCamerasMergingLight)).toBe(true);
  });

  it('should return true for overlapping cameras merging distance ranges', () => {
    expect(isCoverageSufficient(targetSpecs, overlappingCamerasMergingDistance)).toBe(true);
  });

  it('should return false for cameras with unaligned ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithUnalignedRanges)).toBe(false);
  });

  it('should return true for cameras with adjacent ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithAdjacentRanges)).toBe(true);
  });

  it('should return true for a single wide-range camera', () => {
    expect(isCoverageSufficient(targetSpecs, wideRangeCamera)).toBe(true);
  });

  it('should return false for redundant cameras with gaps', () => {
    expect(isCoverageSufficient(targetSpecs, redundantCamerasWithGaps)).toBe(false);
  });

  it('should return true for a camera perfectly matching the edge case', () => {
    expect(isCoverageSufficient(targetSpecs, edgeCaseCamera)).toBe(true);
  });

  it('should return true for a camera with an excessively wide light range', () => {
    expect(isCoverageSufficient(targetSpecs, lightRangeTooWide)).toBe(true);
  });

  it('should return false for partially overlapping cameras', () => {
    expect(isCoverageSufficient(targetSpecs, partiallyOverlappingCameras)).toBe(false);
  });

  it('should return false for cameras with completely separate ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithDifferentRanges)).toBe(false);
  });

  it('should return false for cameras with minimal and maximal light ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithMinMaxRanges)).toBe(false);
  });

  it('should return true for cameras with completely overlapping ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithCompleteOverlap)).toBe(true);
  });

  it('should return false for cameras with tiny intervals but partial coverage', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithTinyIntervals)).toBe(false);
  });

  it('should return false for cameras with identical light but different distance ranges', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithIdenticalLightDifferentDistance)).toBe(false);
  });

  it('should return false for cameras with partial overlap', () => {
    expect(isCoverageSufficient(targetSpecs, camerasWithPartialOverlap)).toBe(false);
  });

  it('should return false for cameras covering only light', () => {
    expect(isCoverageSufficient(targetSpecs, camerasCoveringOnlyLight)).toBe(false);
  });

  it('should return false for cameras covering only distance', () => {
    expect(isCoverageSufficient(targetSpecs, camerasCoveringOnlyDistance)).toBe(false);
  });

  it('should return false for completely separate cameras', () => {
    expect(isCoverageSufficient(targetSpecs, camerasCompletelySeparate)).toBe(false);
  });

  it('should return true for a single universal camera covering all ranges', () => {
    expect(isCoverageSufficient(targetSpecs, universalCamera)).toBe(true);
  });
});
