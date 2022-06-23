import getProperties from 'fusion:properties';
import _ from 'lodash';
import getSectionBySite from './story/getSectionBySite';
import getSectionConfig from './sectionConfig';

export default function sectionNavigation(
  arcSite,
  globalContent,
  globalContentConfig
) {
  const getIdFromSource = (source) => {
    const properties = getProperties(arcSite);
    const defaultId = properties.site.defaultSectionId;
    const ids = {
      section: () => {
        const id =
          globalContentConfig.source === 'section'
            ? globalContentConfig.query.section
            : globalContentConfig.query.currentSection;
        const isPrimary = _(properties.content.sections).find({
          _id: id,
          type: 'primary'
        });
        return isPrimary ? id : defaultId;
      },
      mixedSection: () => {
        return ids.section();
      },
      configSection: () => {
        return globalContent.type === 'primary' ? globalContent._id : defaultId;
      },
      story: () => {
        const section = !_.isUndefined(getSectionBySite(globalContent, arcSite))
          ? getSectionBySite(globalContent, arcSite)
          : undefined;

        if (_.isUndefined(section)) {
          return undefined;
        }

        return section.type === 'reference' ? section.referent.id : section._id;
      },
      sectionAndStory: () => {
        let sectionId;
        if (globalContent?.contentSource?.includes('story')) {
          // eslint-disable-next-line camelcase
          return globalContent?.taxonomy?.primary_section?.parent_id;
        }
        if (
          globalContent?.contentSource === 'section' ||
          globalContent?.contentSource === 'subsection'
        ) {
          sectionId =
            globalContent?.section?.parent?.default === '/'
              ? globalContent?.section?._id
              : globalContent?.section?.parent?.default;
        }
        return sectionId;
      },
      default: () => {
        return defaultId;
      }
    };
    return (ids[source] || ids.default)();
  };

  const sectionId = getIdFromSource(globalContentConfig.source);

  const currentConfig = _(getProperties(arcSite).content.sections).find({
    _id: sectionId
  });
  const config = getSectionConfig(arcSite, sectionId);
  const isVia = (currentConfig && currentConfig.title.includes('Vía')) || false;
  const sectionName =
    (currentConfig &&
      currentConfig.title.replace('Vía', '').split(' ').join('')) ||
    '';
  return {
    isVia,
    sectionName,
    config
  };
}
