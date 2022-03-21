import { useContent } from "fusion:content";

const getSectionInfo = (_id, arcSite) => {
  const query = { _id };
  query["arc-site"] = arcSite;
  return useContent({
    source: "sectionInfo",
    query
  });
};

export default getSectionInfo;
