export default function pushWhen(arr, cond, item) {
  const copy = [...arr];
  return (cond && copy.concat(item)) || copy;
}
