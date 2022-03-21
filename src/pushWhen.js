export default (arr, cond, item) => {
  const copy = [...arr];
  return (cond && copy.concat(item)) || copy;
};
