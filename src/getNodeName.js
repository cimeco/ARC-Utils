import _ from "lodash";
import getTaxonomiesBySite from "./card/getTaxonomiesBySite";

const dataContent = content => {
  if (!_.isUndefined(content)) {
    switch (content.type) {
      case "results":
        return content.content_elements[0];
      case "story":
        return content;
      default:
        return undefined;
    }
  }
  return undefined;
};

export default content => {
  const sectionTarget =
    !_.isUndefined(dataContent(content)) &&
    !_.isUndefined(getTaxonomiesBySite(dataContent(content)).primary_section)
      ? _.trim(
          getTaxonomiesBySite(dataContent(content)).primary_section.path,
          "/"
        )
      : null;

  return sectionTarget;
};
