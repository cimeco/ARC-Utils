import { useContent } from 'fusion:content';

export default function getAuthorInfo(id) {
  const query = { authorID: id };
  return useContent({
    source: 'authorInfo',
    query: query
  });
}
