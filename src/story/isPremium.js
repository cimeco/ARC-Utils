import _ from 'lodash';

export default function isPremium(articleObject) {
  return !_.isUndefined(articleObject) && !_.isUndefined(articleObject.taxonomy)
    ? !_.isUndefined(_.find(articleObject.taxonomy.tags, { slug: 'exclusivo' }))
    : false;
}
