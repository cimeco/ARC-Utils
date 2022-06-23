import { useContent } from 'fusion:content';

export default function getSectionInfo(_id, arcSite) {
  const query = { _id };
  query['arc-site'] = arcSite;
  return useContent({
    source: 'sectionInfo',
    query
  });
}
