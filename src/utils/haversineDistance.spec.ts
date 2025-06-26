import { haversineDistance } from "./haversineDistance";

describe('haversineDistance', () => {
  it('should return 0 when both coordinates are the same', () => {
    const lat = 40.7128;
    const lon = -74.006;
    expect(haversineDistance(lat, lon, lat, lon)).toBeCloseTo(0);
  });

  it('should be symmetric (distance A->B == distance B->A)', () => {
    const lat1 = 51.5074;
    const lon1 = -0.1278; 
    const lat2 = 48.8566;
    const lon2 = 2.3522; 

    const d1 = haversineDistance(lat1, lon1, lat2, lon2);
    const d2 = haversineDistance(lat2, lon2, lat1, lon1);

    expect(d1).toBeCloseTo(d2);
  });
});
