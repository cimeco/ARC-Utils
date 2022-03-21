import _ from "lodash";

const getSectionSlug = globalContent => {
  if (!globalContent || !globalContent.section || !globalContent.section.parent)
    return "";
  return `section-${_.kebabCase(
    _.replace(
      _.trim(
        globalContent.section.parent.default !== "/"
          ? globalContent.section.parent.default
          : globalContent.section._id || "",
        "/"
      ),
      "/",
      "-"
    )
  )}`;
};

export default getSectionSlug;
