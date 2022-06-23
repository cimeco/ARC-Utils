import _ from 'lodash';

export default function isNEU(object) {
  return _.isEmpty(object) || _.isNull(object) || _.isUndefined(object);
}
