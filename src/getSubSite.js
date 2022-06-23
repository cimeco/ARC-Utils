import _ from 'lodash';
import getSectionSlug from './getSectionSlug';
import getSectionBySite from './story/getSectionBySite';

export default function getSubSite(data, arcSite) {
  let subsite = _.startCase(arcSite);

  if (
    data &&
    data.contentSource &&
    ['section', 'subsection'].includes(data.contentSource)
  ) {
    subsite = _.startCase(_.replace(getSectionSlug(data), 'section-', ''));
  }

  if (
    data &&
    data.type &&
    data.type === 'story' &&
    data.taxonomy &&
    data.taxonomy.primary_section &&
    data.taxonomy.primary_section.parent_id !== '/'
  ) {
    subsite = _.startCase(data.taxonomy.primary_section.parent_id);
  }

  if (data && data.type === 'primary' && data.title && arcSite === 'via-pais') {
    subsite = data.title;
  }

  if (data && data.type && data.type === 'story' && arcSite === 'via-pais') {
    subsite = !_.isUndefined(getSectionBySite(data, arcSite))
      ? getSectionBySite(data, arcSite).name
      : 'Vía País';
  }

  if (
    arcSite === 'la-voz' &&
    !['Agro', 'Deportes', 'Vos', 'Musa'].includes(subsite)
  ) {
    subsite = 'La Voz';
  }
  return subsite;
}
