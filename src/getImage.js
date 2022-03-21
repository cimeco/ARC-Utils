import { ENVIRONMENT, USE_DEPLOYMENT_IN } from "fusion:environment";

export default function getImage(
  arcSite,
  contextPath,
  deployment,
  url,
  forceResource = false
) {
  if (
    (ENVIRONMENT === "grupoclarin" || url.includes("http")) &&
    USE_DEPLOYMENT_IN !== arcSite &&
    !forceResource
  ) {
    return url;
  }
  return deployment(`${contextPath}/resources/${arcSite}/${url}`);
}
