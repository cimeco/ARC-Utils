export default function getSectionClass(
  arcSite,
  globalContent,
  globalContentConfig
) {
  switch (globalContentConfig.source) {
    case 'configSection':
      return `via-${globalContent._id.replace('/', '')}`;
    case 'section':
      return `via-${globalContentConfig.query.section.replace('/', '')}`;
    case 'story':
      // eslint-disable-next-line prettier/prettier
      return `via-${(globalContent.websites[arcSite].website_section.type ===
      'reference'
        ? globalContent.websites[arcSite].website_section.referent.id
        : globalContent.websites[arcSite].website_section._id
      ).replace('/', '')}`;
    default:
      return '';
  }
}
