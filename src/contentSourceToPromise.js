import _ from "lodash";
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from "fusion:environment";
import request from "request-promise-native";

export default (source, key = {}, isContentApi = false) => {
  if (!_.isUndefined(source.fetch)) {
    return source.fetch(key);
  }

  const options = {
    gzip: true,
    json: true,
    headers: {
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  };

  return request({
    url: `${isContentApi ? CONTENT_BASE : ""}${source.resolve(key)}`,
    ...options
  });
};
