/* eslint-disable no-nested-ternary */
import getProperties from 'fusion:properties';
import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import getSectionBySite from '../story/getSectionBySite';
import getUrlBySite from '../getUrlBySite';
import resizeImage from '../story/resizeImage';

export default (
  data,
  navigation,
  requestUri,
  arcSite,
  contextPath,
  globalContent,
  globalContentConfig
) => {
  // eslint-disable-next-line camelcase
  const { tags, seo_keywords } = !_.isUndefined(data.taxonomy)
    ? data.taxonomy
    : [];
  const properties = getProperties(arcSite);

  const canonicalBaseUrl = !_.isNil(arcSite)
    ? getProperties(arcSite).site.baseUrl
    : properties.site.baseUrl;

  const uri = !_.isNil(arcSite)
    ? data.websites[arcSite].website_url
    : requestUri;

  const values = {
    description: !_.isUndefined(data.subheadlines)
      ? data.subheadlines.basic
      : '' || data.description.basic,
    type: 'article',
    keywords: [
      ...((tags && tags.map((t) => t.text)) || []),
      ...(seo_keywords || [])
    ],
    section: !_.isUndefined(getSectionBySite(data, arcSite))
      ? getSectionBySite(data, arcSite).name
      : '',
    cXenseParse_article_id: data._id,
    publish_time: moment(data.first_publish_date)
      .tz(properties.site.timezone || 'America/Argentina/Buenos_Aires')
      .format(),
    lastmod: moment(data.last_updated_date)
      .tz(properties.site.timezone || 'America/Argentina/Buenos_Aires')
      .format(),
    auth:
      !_.isUndefined(data.credits) &&
      !_.isUndefined(data.credits.by) &&
      data.credits.by.length > 0
        ? data.credits.by[0] &&
          (!_.isUndefined(data.credits.by[0]._id)
            ? data.credits.by[0].additional_properties
              ? data.credits.by[0].additional_properties.original.byline
              : data.credits.by[0].byline
            : data.credits.by[0].name)
        : ''
  };
  values.title = `${
    data.headlines.basic || data.headlines.mobile || data.headlines.web
  } | ${!_.isEmpty(values.section) ? values.section : properties.site.name}`;
  if (arcSite === 'la-voz') {
    const isSponsorStory =
      globalContent?.type?.includes('story') &&
      globalContent?.taxonomy?.sections?.find((s) => {
        return (
          s._id === '/espacio-de-marca' ||
          s._id === '/espacio-publicidad' ||
          s._id === '/espacio-institucional'
        );
      });
    if (isSponsorStory) {
      values.title = `${
        data.headlines.basic || data.headlines.mobile || data.headlines.web
      } | ${properties.site.name}`;
    } else {
      values.title = `${
        data.headlines.basic || data.headlines.mobile || data.headlines.web
      } | ${
        !_.isEmpty(values.section)
          ? `${values.section} | ${properties.site.name}`
          : properties.site.name
      }`;
    }
  }
  values.description = `${
    !_.isUndefined(data.subheadlines) &&
    !_.isUndefined(data.subheadlines.basic) &&
    !_.isEmpty(data.subheadlines.basic)
      ? data.subheadlines.basic
      : !_.isUndefined(data.headlines) &&
        !_.isUndefined(data.headlines.basic) &&
        !_.isEmpty(data.headlines.basic)
      ? data.headlines.basic
      : ''
  }`;
  values.url = `${properties.site.baseUrl}${
    data.canonical_url || data.website_url
  }`;
  if (!_.isUndefined(data.promo_items)) {
    const { basic } = data.promo_items || {};
    if (basic && basic.url) {
      values.image =
        resizeImage(
          basic,
          {
            width: 1200,
            height: 630
          },
          properties.services.thumbor.url
        ) || '';
    }
  }
  if (
    globalContentConfig.source !== 'configSection' ||
    _.isUndefined(data.canonicalUrl)
  ) {
    values.canonicalUrl = `${canonicalBaseUrl}${getUrlBySite(
      contextPath,
      uri,
      data.canonical_website
    )}`;
  }

  return values;
};
