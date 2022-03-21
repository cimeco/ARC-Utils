// eslint-disable-next-line import/prefer-default-export
export const checkObjPropertyExist = (obj, property) => {
  if (obj === undefined) return false;
  if (property === null || property === undefined) return false;
  if (property === "") return true;
  const _filters = property.split(".");
  const _current = _filters[0];
  _filters.shift();
  if (obj[_current] === undefined) return false;

  return checkObjPropertyExist(obj[_current], _filters.join("."));
};
export const getObjProperty = (obj, property) => {
  return property.split(".").reduce((r, c) => {
    return r[c];
  }, obj);
};
