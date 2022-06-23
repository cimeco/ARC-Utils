export default function getDistanceBetweenCoords(coord1, coord2) {
  if (!coord1 || !coord1) {
    return Infinity;
  }
  const a = (coord1.lat * Math.PI) / 180;
  const b = (coord2.lat * Math.PI) / 180;
  const c = ((coord2.lon - coord1.lon) * Math.PI) / 180;
  const R = 6371e3;

  return Math.acos(
    Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(c)
  ) * R;
}
