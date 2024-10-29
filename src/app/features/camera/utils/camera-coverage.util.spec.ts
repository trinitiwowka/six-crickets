import {CameraSpecs, DesiredSpecs, isCoverageSufficient} from './camera-coverage.util';

describe('CameraCoverageUtil', () => {
  const targetSpecs: DesiredSpecs = {
    requiredDistanceRange: [1, 10],
    requiredLightRange: [100, 1000]
  };

  const fullCoverageCameras: CameraSpecs[] = [
    { distanceRange: [0, 5], lightRange: [50, 500] },
    { distanceRange: [5, 15], lightRange: [500, 1500] }
  ];

  const incompleteDistanceCameras: CameraSpecs[] = [
    { distanceRange: [0, 4], lightRange: [50, 500] },
    { distanceRange: [6, 15], lightRange: [500, 1500] }
  ];

  const incompleteLightCameras: CameraSpecs[] = [
    { distanceRange: [0, 10], lightRange: [50, 300] },
    { distanceRange: [5, 15], lightRange: [800, 1500] }
  ];

  const singleFullCoverageCamera: CameraSpecs[] = [
    { distanceRange: [0, 15], lightRange: [50, 1500] }
  ];

  const noAvailableCameras: CameraSpecs[] = [];

  const partialCoverageCameras: CameraSpecs[] = [
    { distanceRange: [1, 3], lightRange: [100, 500] },
    { distanceRange: [4, 6], lightRange: [600, 800] }
  ];

  const overlappingCoverageCameras: CameraSpecs[] = [
    { distanceRange: [1, 6], lightRange: [100, 600] },
    { distanceRange: [5, 10], lightRange: [500, 1000] }
  ];

  const multipleCamerasCoveringRange: CameraSpecs[] = [
    { distanceRange: [0, 2], lightRange: [50, 200] },
    { distanceRange: [2, 4], lightRange: [200, 400] },
    { distanceRange: [4, 6], lightRange: [400, 600] },
    { distanceRange: [6, 8], lightRange: [600, 800] },
    { distanceRange: [8, 10], lightRange: [800, 1000] },
    { distanceRange: [10, 12], lightRange: [1000, 1200] }
  ];

  it('should return true if hardware cameras fully cover the required specs', () => {
    const result = isCoverageSufficient(targetSpecs, fullCoverageCameras);
    expect(result).toBe(true);
  });

  it('should return false if hardware cameras do not fully cover the distance range', () => {
    const result = isCoverageSufficient(targetSpecs, incompleteDistanceCameras);
    expect(result).toBe(false);
  });

  it('should return false if hardware cameras do not fully cover the light range', () => {
    const result = isCoverageSufficient(targetSpecs, incompleteLightCameras);
    expect(result).toBe(false);
  });

  it('should return true if a single camera is sufficient to cover the required specs', () => {
    const result = isCoverageSufficient(targetSpecs, singleFullCoverageCamera);
    expect(result).toBe(true);
  });

  it('should return false if no cameras are available', () => {
    const result = isCoverageSufficient(targetSpecs, noAvailableCameras);
    expect(result).toBe(false);
  });

  it('should return false if cameras partially cover the required range', () => {
    const result = isCoverageSufficient(targetSpecs, partialCoverageCameras);
    expect(result).toBe(false);
  });

  it('should return true if overlapping cameras provide full coverage', () => {
    const result = isCoverageSufficient(targetSpecs, overlappingCoverageCameras);
    expect(result).toBe(true);
  });

  it('should return true if multiple cameras together provide full coverage', () => {
    const result = isCoverageSufficient(targetSpecs, multipleCamerasCoveringRange);
    expect(result).toBe(true);
  });
});
