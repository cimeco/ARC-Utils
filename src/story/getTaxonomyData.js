import _ from 'lodash';

export default function getTaxonomyData(object) {
  return {
    taxonomyName: !_.isUndefined(object.path)
      ? _.get(object.path, object.namePath)
      : '',
    taxonomyUrl: !_.isUndefined(object.path)
      ? _.get(object.path, object.urlPath)
      : ''
  };
}
