import { ENVIRONMENT } from "fusion:environment";
import _ from "lodash";
import { website } from "./params";

export default function getUrlBySite(
  contextPath,
  url,
  arcSite,
  keepParams = false
) {
  if (_.isNil(url)) {
    return "";
  }

  let _url = url.replace("/homepage", "");
  if (keepParams) _url = _url.replace(/[?].+/, "");
  if (ENVIRONMENT === "grupoclarin" || url.includes("http")) {
    return _url.endsWith("/") ? _url : `${_url}/`;
  }

  return `${contextPath}${website(_url)(arcSite)}`;
}
