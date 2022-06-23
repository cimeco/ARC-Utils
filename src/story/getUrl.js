import _ from 'lodash';
import getProperties from 'fusion:properties';

export default function getUrl(articleObject, site) {
  const website = articleObject.canonical_website;
  const properties = getProperties(website);

  if (articleObject?.related_content?.redirect?.length > 0) {
    return (
      articleObject?.related_content?.redirect[0]?.redirect_url ||
      articleObject?.related_content?.redirect[0]
    );
  }

  return (
    (!_.isUndefined(articleObject.websites) &&
      !_.isUndefined(articleObject.websites[site]) &&
      articleObject.websites[site].website_url) ||
    `${!_.isUndefined(website) ? properties.site.baseUrl : ''}${
      articleObject.canonical_url
    }`
  );
}
