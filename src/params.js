const appendParam = (param) => {
  function defineParam(href) {
    function defineValue(value) {
      const hrefParts = (href || '').split('#');
      const uri = hrefParts[0];
      const hash = hrefParts.slice(1).join('#');
      const urlParts = uri.split('?');
      const endpoint = urlParts[0];
      const query = urlParts.slice(1).join('?');
      const params =
        typeof value !== 'undefined'
          ? [`${param}=${encodeURIComponent(String(value))}`]
          : [];
      const queryList = params.concat(
        query.split('&').filter((q) => {
          return q && !RegExp(`^${param}=`).test(q);
        })
      );

      return `${endpoint}?${queryList.join('&')}${hash ? `#${hash}` : ''}`;
    }

    return defineValue;
  }

  return defineParam;
};

const website = appendParam('_website');

const page = appendParam('page');

const outputType = appendParam('outputType');

export { page, website, outputType };
