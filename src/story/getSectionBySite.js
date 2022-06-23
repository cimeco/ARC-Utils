import _ from 'lodash';
import getSectionFromConfig from './getSectionFromConfig';

export default function getSectionBySite(articleObject, site) {
  const primarySection = !_.isUndefined(articleObject.taxonomy)
    ? getSectionFromConfig(articleObject.taxonomy.primary_section, site)
    : {};
  const bypassSection =
    _.isUndefined(site) ||
    (!_.isUndefined(primarySection) &&
      _.isString(site) &&
      site === primarySection._website);

  return bypassSection
    ? primarySection
    : _(
        !_.isUndefined(articleObject.taxonomy)
          ? articleObject.taxonomy.sections
          : []
      ).find({ _website: site }) || primarySection;
}
