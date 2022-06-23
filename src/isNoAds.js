export default function isNoAds(requestUri) {
  return requestUri.includes('outputType=noads');
}
