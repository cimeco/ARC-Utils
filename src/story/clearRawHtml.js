import _ from 'lodash';
import _isAmp from '../isAmp';

// TODO: Separate functions in files
export default function clearRawHtml(rawHtml = '', requestUri, isAmp) {
  const removeEmbedOnAMP = (text) => {
    // console.log(1, text);
    if (isAmp && text.includes('<embed')) {
      return '';
    }
    return text;
  };
  const replaceIframes = (text) => {
    // console.log(2, text);
    if (isAmp) {
      return text
        .replace(/<iframe/gi, '<amp-iframe')
        .replace(/<\/iframe/gi, '</amp-iframe');
    }
    return text;
  };
  const removeFontTag = (text) => {
    // console.log(3, text);
    return text.replace(/<font(.*?)>/gi, '').replace(/<\/font>/gi, '');
  };

  const addProtocolToUrls = (text) => {
    // console.log(4, text);
    return text
      .replace(/src="\/\//gi, 'src="https://')
      .replace(/src="http:\/\//gi, 'src="https://');
  };

  const allowScriptsInIframes = (text) => {
    // console.log(5, text);
    return text.replace(
      /<iframe/gi,
      '<iframe sandbox="allow-scripts allow-same-origin allow-forms"'
    );
  };

  const fixFrameBorder = (text) => {
    // console.log(6, text);
    return text.replace(/frameborder="no"/gi, 'frameborder="0"');
  };

  const fixAllowTransparency = (text) => {
    // console.log(7, text);
    return text.replace(
      /allowtransparency="true"/gi,
      'allowtransparency="allowtransparency"'
    );
  };
  const removeIframeWithoutSrc = (text) => {
    // console.log(8, text);
    if (
      text.includes('iframe') &&
      !text.includes('src=') &&
      !text.includes('srcdoc=')
    ) {
      return '';
    }
    return text;
  };
  const fixDataOriginal = (text) => {
    // console.log(9, text);
    return text.replace(/data-original=/gi, 'src=');
  };

  const fixAllowFullScreen = (text) => {
    // console.log(10, text);
    return text
      .replace(/allowfullscreen>/gi, 'allowfullscreen="allowfullscreen">')
      .replace(/allowfullscreen /gi, 'allowfullscreen="allowfullscreen" ')
      .replace(/allowfullscreen="true"/gi, 'allowfullscreen="allowfullscreen"')
      .replace(/mozallowfullscreen=""/gi, '')
      .replace(/msallowfullscreen=""/gi, '')
      .replace(/oallowfullscreen=""/gi, '')
      .replace(/webkitallowfullscreen=""/gi, '');
  };

  const removeClasses = (text) => {
    // console.log(11, text);
    let _text = text;
    if (
      text.includes('class=') &&
      !text.includes('genoa') &&
      !text.includes('public.flourish.studio')
    ) {
      const regex = /class=['"](.*?)['"]/gi;
      _text = text.replace(regex, '');
    }
    return _text;
  };
  const removeNames = (text) => {
    // console.log(12, text);
    if (text.includes('name=')) {
      const regex = /name=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeImportant = (text) => {
    // console.log(12, text);
    if (text.includes('!important')) {
      const regex = /!important/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeStyles = (text) => {
    // console.log(13, text);
    if (text.includes('style=')) {
      const regex = /style=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeLoading = (text) => {
    // console.log(14, text);
    if (text.includes('loading=')) {
      const regex = /loading=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };

  const removeScripts = (text) => {
    // console.log(15, text);
    if (
      !_isAmp(requestUri) ||
      (!_isAmp(requestUri) && text.includes('public.flourish.studio'))
    )
      return text;
    const regex =
      /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/gi;
    const onloadRegex = /onload=['](.*?)[']|onload=["](.*?)["]/gi;
    const removeLineBreaks = /\r?\n?/gi;
    const regex2 = /<script(.*?)<\/script>/gi;

    return text
      .replace(removeLineBreaks, '')
      .replace(regex, '')
      .replace(regex2, '')
      .replace(onloadRegex, '');
  };

  const cleanSpans = (text) => {
    // console.log(16, text);
    const regex = /<span(.*?)>(.*?)<\/span>/i;
    let result = regex.exec(text);
    let _text = text;
    let hasSpan = false;
    if (result && result[2]) {
      hasSpan = true;
      while (result && result[2]) {
        _text = _text.replace(regex, '$2');
        result = regex.exec(_text);
      }
    }
    return hasSpan ? `<p>${_text}</p>` : text;
  };

  const removeInnerIframe = (text) => {
    // console.log(17, text);
    if (!_isAmp(requestUri) && text.includes('ecp.clarin.com')) {
      return text;
    }
    const regex = /<iframe(.*?)>(.*?)(<\/iframe>)/gi;
    const result = regex.exec(text);
    if (result !== null) {
      return `<iframe ${result[1]}></iframe>`;
    }
    return text;
  };

  const removeAllowScriptAccess = (text) => {
    if (text.includes('allowscriptaccess=')) {
      const regex = /allowscriptaccess=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeResponsive = (text) => {
    // console.log(19, text);
    if (text.includes('responsive=')) {
      const regex = /responsive=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };

  const removeAllowFullscreen = (text) => {
    if (text.includes('webkitallowfullscreen=' || 'mozallowfullscreen=')) {
      const regexWebkit = /webkitallowfullscreen=['"](.*?)['"]/gi;
      const regexMoz = /mozallowfullscreen=['"](.*?)['"]/gi;
      return text.replace(regexWebkit, '').replace(regexMoz, '');
    }
    return text;
  };

  const removeIframeLayout = (text) => {
    if (text.includes('layout=')) {
      const regex = /layout=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeIs = (text) => {
    // console.log(20, text);
    if (text.includes('is=')) {
      const regex = /is=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };

  const removeAMPiframeMaxMin = (text) => {
    if (text.includes('<amp-iframe')) {
      const maxWidth = /max-width=['"](.*?)['"]/gi;
      const minWidth = /min-width=['"](.*?)['"]/gi;
      const maxHeight = /max-height=['"](.*?)['"]/gi;
      const minHeight = /min-height=['"](.*?)['"]/gi;
      return text
        .replace(maxWidth, '')
        .replace(minWidth, '')
        .replace(maxHeight, '')
        .replace(minHeight, '');
    }
    return text;
  };

  const removeType = (text) => {
    // console.log(21, text);
    if (text.includes('type=')) {
      const regex = /type=['"](.*?)['"]/gi;
      return text.replace(regex, '');
    }
    return text;
  };
  const removeAnyNumberAsProperty = (text) => {
    // console.log(22, text);
    const regex = /(\d+)=['"](.*?)['"]/gi;
    return text.replace(regex, '');
  };

  const removeSrcWithJs = (text) => {
    // console.log(23, text);
    const regex = /<iframe(.*?)src=['"]javascript/gi;
    if (regex.test(text)) return '';
    return text;
  };

  const isNumeric = (string) => {
    return /^-?\d+$/.test(string);
  };

  const removeObjectTag = (text) => {
    // console.log(24, text);
    const regex = /<object(.*?)>(.*?)<\/object>/gi;
    return text.replace(regex, '');
  };

  const removeParamTag = (text) => {
    // console.log(25, text);
    const regex = /<param(.*?)>(.*?)<\/param>/gi;
    return text.replace(regex, '');
  };
  const removeBrTag = (text) => {
    // console.log(25, text);
    let regex = /<br(.*?)>(.*?)<\/br>/gi;
    const _text = text.replace(regex, '');
    regex = /<br\/>/gi;
    return _text.replace(regex, '');
  };

  const instagramBlockQuoteAsAMP = (text) => {
    // console.log(26, text);
    if (
      text.includes('blockquote') &&
      text.includes('data-instgrm-permalink')
    ) {
      const regex = /data-instgrm-permalink=["'](.*?)["']/;
      let src = regex.exec(text)[1].split('?')[0];
      src =
        src[src.length - 1] !== '/' ? src : src.substring(0, src.length - 1);
      src = /([^/]*$)/.exec(src);
      if (!src || !src[1]) return text;
      if (isAmp) {
        return `<div class="story-embeded story-instagram">
        <amp-instagram
          data-shortcode="${(src && src[1]) || ''}"
          data-captioned
          width="325"
          height="400"
          layout="fixed"
        />
      </div>`;
      }
      // TODO: AGREGAR REEMPLAZO DE AMP-INSTAGRAM
    }
    return text;
  };

  const removeAllAttrButAMP = (text) => {
    // console.log(27, text);
    if (isAmp && !text.includes('ecp.clarin.com')) {
      if (text.includes('<iframe')) {
        // eslint-disable-next-line max-len
        const regex =
          /\s(?:width|height|frameborder|allowtransparency|allowfullscreen|sandbox|src|srcdoc|class)=(['][^']*[']|["][^"]*["])/gi;
        const matches = text.match(regex);

        let result = `<iframe`;

        matches.forEach((match) => {
          result += `${match}`;
        });
        result += '></iframe>';

        return result;
      }
    }

    return text;
  };

  const changeWidthAndHeight = (text) => {
    // console.log(28, text);
    if (!text.includes('<amp-iframe') && !text.includes('<iframe')) return text;
    let _text = text.replace(/\n/gi, '');
    // Si width o height tienen algo que no sea un numero en su valor, reemplaza por 500
    const widthAttr = /width=["'](.*?)["']/gi;
    const heightAttr = /height=["'](.*?)["']/gi;
    let result = widthAttr.exec(_text);

    if (result && result[1] && !result[1].includes('%') && result[1] < 500)
      _text = _text.replace(widthAttr, "width='500'");

    if (result && result[1] && !isNumeric(result[1].split('%')[0]))
      _text = _text.replace(widthAttr, "width='500'");

    result = heightAttr.exec(_text);
    if (result && result[1] && !isNumeric(result[1].split('%')[0]))
      _text = _text.replace(heightAttr, 'height="500"');

    // Si width o height tienen %, reemplaza por 100 si es distinto - no se perimiten porcentahjes excepto 100%
    widthAttr.lastIndex = 0;
    heightAttr.lastIndex = 0;
    result = widthAttr.exec(_text);

    if (
      result &&
      result[1] &&
      result[1].includes('%') &&
      result[1].split('%')[0] !== '100'
    ) {
      _text = _text.replace(widthAttr, "width='100%'");
    }

    result = heightAttr.exec(_text);
    if (
      result &&
      result[1] &&
      result[1].includes('%') &&
      result[1].split('%')[0] !== '100'
    ) {
      _text = _text.replace(heightAttr, "height='100%'");
    }

    // Si width o height no existen, se asigna 500
    if (!_text.includes('width='))
      _text = _text.replace('iframe', 'iframe width="500"');
    if (!_text.includes('height='))
      _text = _text.replace('iframe', 'iframe height="500"');

    _text = _text.replace(/%px/g, '%');
    _text = _text.replace(/px%/g, 'px');

    _text = _text
      .replace(/width=["']560["']/gi, 'width="560" layout="responsive"')
      .replace(/width=["']100%["']/gi, 'width="500" layout="responsive"')
      .replace(/width=["']500["']/gi, 'width="500" layout="responsive"')
      .replace(/width=["']600["']/gi, 'width="600" layout="responsive"')
      .replace(/width=["']640["']/gi, 'width="640" layout="responsive"')
      .replace(/width=["']650["']/gi, 'width="650" layout="responsive"')
      .replace(/height=["']100%["']/gi, 'height="500" layout="responsive"');
    return _text;
  };

  const addExtra = (text) => {
    if (text.includes('genoa')) return `<div class="genoa">${text}</div>`;
    const regex = /iframe.*src\s*=\s*(['][^']*[']|["][^"]*["])/g;
    const result = regex.exec(text);
    if (result && result[1] && result[1].includes('youtube.com'))
      return `<div class="youtube">${text}</div>`;
    return text;
  };

  const addScrolling = (text) => {
    if (isAmp && text.includes('ecp.clarin.com')) {
      return text.replace('iframe', 'iframe scrolling="yes"');
    }
    return text;
  };

  const logText = (text) => {
    return text;
  };

  return _.flow([
    removeObjectTag,
    removeParamTag,
    removeBrTag,
    removeEmbedOnAMP,
    allowScriptsInIframes,
    fixDataOriginal,
    fixAllowTransparency,
    fixAllowFullScreen,
    removeAllAttrButAMP,
    removeIframeWithoutSrc,
    fixFrameBorder,
    fixAllowTransparency,
    fixAllowFullScreen,
    addScrolling,
    removeInnerIframe,
    logText,
    removeSrcWithJs,
    replaceIframes,
    removeClasses,
    removeNames,
    removeLoading,
    removeImportant,
    removeStyles,
    removeFontTag,
    removeIs,
    removeType,
    removeResponsive,
    addProtocolToUrls,
    cleanSpans,
    changeWidthAndHeight,
    removeScripts,
    instagramBlockQuoteAsAMP,
    removeAnyNumberAsProperty,
    addExtra
  ])(rawHtml);
}
