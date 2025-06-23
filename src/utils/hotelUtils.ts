export const cityCenters: Record<string, { latitude: number; longitude: number }> = {
  London: { latitude: 51.5074, longitude: -0.1278 },
  Paris: { latitude: 48.8566, longitude: 2.3522 },
  Rome: { latitude: 41.9028, longitude: 12.4964 },
  Madrid: { latitude: 40.4168, longitude: -3.7038 },
  Berlin: { latitude: 52.52, longitude: 13.405 },
};

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export async function validateGallery(gallery: string[]): Promise<string[]> {
  const results = await Promise.all(
    gallery.map(async (url) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok ? url : null;
      } catch {
        return null;
      }
    })
  );
  return results.filter(Boolean) as string[];
}
