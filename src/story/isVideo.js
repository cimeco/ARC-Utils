import _ from "lodash";

export default articleObject => {
  if (
    !_.isUndefined(articleObject) &&
    !_.isUndefined(articleObject.content_elements)
  ) {
    return (
      _.some(articleObject.content_elements, {
        type: "custom_embed",
        subtype: "Video"
      }) ||
      _.some(articleObject.content_elements, {
        type: "oembed_response",
        subtype: "youtube"
      })
    );
  }
};
