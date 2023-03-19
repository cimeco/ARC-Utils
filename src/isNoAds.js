/**
 * Returns true if the given request URI contains the substring
 * 'outputType=noads', false otherwise.
 *
 * @param {string} requestUri - The request URI to check.
 *
 * @returns {boolean} - True if the request URI contains 'outputType=noads',
 * false otherwise.
 */
export default (requestUri) => {
  if (typeof requestUri !== 'string') {
    throw new Error('Invalid request URI');
  }
  return requestUri.includes('outputType=noads');
};
