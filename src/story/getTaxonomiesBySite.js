import _ from 'lodash';

export default function getTaxonomiesBySite(articleObject) {
  return !_.isUndefined(articleObject) && !_.isUndefined(articleObject.taxonomy)
    ? articleObject.taxonomy
    : {};
}
