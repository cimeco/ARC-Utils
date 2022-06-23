import _ from 'lodash';

export default function clearText(content = '') {
  const cleanSpans = (text) => {
    const regex = /<span.*>(.*)<\/span>/gi;
    return text.replace(regex, '$1');
  };
  const removeFontTag = (text) => {
    return text.replace(/<font(.*?)>/gi, '').replace(/<\/font>/gi, '');
  };

  return _.flow(cleanSpans, removeFontTag)(content);
}
