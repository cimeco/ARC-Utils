import _ from 'lodash';
import getProperties from 'fusion:properties';

export default function getSectionFromConfig(section, site) {
  if (site === 'via-pais' && section && section.type === 'reference') {
    const {
      content: { sections }
    } = getProperties(site);

    const sectionConfig = _(sections).find({
      _id: section.referent.id
    });

    return {
      _id: sectionConfig._id,
      path: sectionConfig._id,
      name: sectionConfig.title,
      _website: site
    };
  }

  return section;
}
