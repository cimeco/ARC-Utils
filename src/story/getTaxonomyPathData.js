import getSectionBySite from './getSectionBySite';

export default function getTaxonomyPathData(showTagTaxonomy, article, arcSite) {
  const hasTags = article.taxonomy?.tags?.length > 0;
  let path = getSectionBySite(article, arcSite);
  if (showTagTaxonomy && hasTags) {
    // eslint-disable-next-line prefer-destructuring
    path = article.taxonomy.tags[0];
  }
  return {
    path,
    namePath: showTagTaxonomy && hasTags ? 'text' : 'name',
    urlPath: showTagTaxonomy && hasTags ? 'slug' : 'path'
  };
}
