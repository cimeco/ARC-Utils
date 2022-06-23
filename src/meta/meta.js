import _ from 'lodash';
import getProperties from 'fusion:properties';
import getUrlBySite from '../getUrlBySite';
import resizeImage from '../story/resizeImage';

const defaultValues = (
  requestUri,
  arcSite,
  contextPath,
  globalContentConfig,
  data
) => {
  const properties = getProperties(arcSite);
  let overwriteUri;
  if (globalContentConfig.source === 'configSection') {
    if (!_.isUndefined(data.canonicalUrl)) {
      overwriteUri = data.canonicalUrl;
    }
  }
  return {
    site: '',
    title: '',
    description: '',
    favicon: properties.site.favicon,
    image:
      resizeImage(
        { url: properties.site.placeholder },
        {
          width: 1200,
          height: 630
        },
        properties.services.thumbor.url
      ) || '',
    url: `${properties.site.baseUrl}${getUrlBySite(
      contextPath,
      requestUri,
      arcSite
    )}`,
    canonicalUrl: `${properties.site.baseUrl}${getUrlBySite(
      contextPath,
      !_.isUndefined(overwriteUri) ? overwriteUri : requestUri,
      arcSite
    )}`,
    type: '',
    keywords: '',
    section: '',
    csrf_token: properties.site.csrfToken,
    cXenseParse_article_id: '',
    tw_site: '',
    fb_page: '',
    fb_id: '',
    publish_time: '',
    lastmod: '',
    author: '',
    rss_title: properties.site.rss && properties.site.rss.title,
    rss_url: properties.site.rss && properties.site.rss.url
  };
};
export default defaultValues;
