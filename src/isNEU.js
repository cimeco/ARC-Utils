import _ from "lodash";

const isNEU = object => {
  return _.isEmpty(object) || _.isNull(object) || _.isUndefined(object);
};
export default isNEU;
