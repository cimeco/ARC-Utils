import { useContent } from "fusion:content";

const getAuthorInfo = id => {
  const query = { authorID: id };
  const authorInfo = useContent({
    source: "authorInfo",
    query: query
  });
  return authorInfo;
};

export default getAuthorInfo;
