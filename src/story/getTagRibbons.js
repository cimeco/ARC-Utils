import _ from 'lodash';

export default function getTagRibbons(tagsRibbon, article) {
  const tags = !_.isUndefined(article.taxonomy) ? article.taxonomy.tags : [];
  return _.intersectionBy(tags, tagsRibbon, 'slug');
}
