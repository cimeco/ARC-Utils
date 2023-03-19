const EARTH_RADIUS_IN_METERS = 6371e3;

export default (coord1, coord2) => {
  if (!coord1 || !coord2) {
    throw new Error('Invalid coordinates');
  }

  const lat1 = (coord1.lat * Math.PI) / 180;
  const lat2 = (coord2.lat * Math.PI) / 180;
  const lonDiff = ((coord2.lon - coord1.lon) * Math.PI) / 180;

  const distance =
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDiff)
    ) * EARTH_RADIUS_IN_METERS;

  return distance;
};
