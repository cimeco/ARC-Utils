import _ from 'lodash';
import getProperties from 'fusion:properties';

export default function sectionConfig(arcSite, sectionId) {
  const defaultSectionConfig =
    _.cloneDeep(getProperties(arcSite).content.sectionDefaultConfig) || null;
  const siteConfigs = getProperties(arcSite);
  const currentSectionConfig =
    _.isUndefined(siteConfigs) || _.isUndefined(siteConfigs.content.sections)
      ? null
      : _.cloneDeep(
          _(siteConfigs.content.sections).find({
            _id: sectionId
          })
        );
  const mergedSectionConfig = _.merge(
    defaultSectionConfig,
    currentSectionConfig
  );
  if (currentSectionConfig && currentSectionConfig.mixedSections) {
    mergedSectionConfig.mixedSections = currentSectionConfig.mixedSections;
  }
  return mergedSectionConfig;
}
