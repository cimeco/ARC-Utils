/* eslint-disable no-case-declarations */
import getProperties from 'fusion:properties';
import _ from 'lodash';
import getSectionBySite from '../story/getSectionBySite';
import getSectionConfig from '../sectionConfig';
import defaultValues from './meta';

const getSectionTitle = (
  globalContent,
  globalContentConfig,
  arcSite,
  data,
  navigation,
  author
) => {
  let name = '';
  const properties = getProperties(arcSite);
  switch (globalContentConfig.source) {
    case 'region':
      name = `Región ${_.capitalize(
        globalContentConfig.query.region.replace('-', ', region ').trim()
      )}`;
      name = `${name} | Últimas Noticias de ${name}`;
      break;
    case 'tag':
      name = `${_.capitalize(
        globalContentConfig.query.tag.trim().replace(/-/g, ' ')
      )}`;
      name = `${name} | Últimas Noticias de ${name} | Temas en ${properties.site.name}`;
      break;
    case 'subtype':
      name = `${_.capitalize(
        globalContentConfig.query.subtype.trim().replace(/lvi_/g, ' ')
      )}`;
      break;
    case 'storyOrTag':
      name = `${_.capitalize(globalContent?.tag?.trim().replace(/-/g, ' '))}`;
      name = `${name} | Últimas Noticias de ${name} | Temas en ${properties.site.name}`;
      break;
    case 'statistics':
      const uri = globalContentConfig.query.option
        ? `${_.trimEnd(globalContentConfig.query.uri, '/')}/`
        : `${_.trimEnd(globalContentConfig.query.uri, '/')}/futbol/`;
      const { statisticsMenu } = properties.menues;
      name = `Estadísticas | `;
      let menuItem = statisticsMenu.find((item) => {
        return uri.includes(item.id);
      });
      name += menuItem.name;
      if (menuItem.submenu) {
        menuItem = globalContentConfig.query.option
          ? menuItem.submenu.find((item) => {
              return uri === item.url;
            })
          : menuItem.submenu[0];
        name += ` - ${menuItem.title} ${menuItem.subtitle} | `;
      } else {
        name += ' | ';
      }
      name += 'MundoD';
      break;
    case 'author':
      name = `${author} | Últimas Noticias de ${author}`;
      break;
    case 'configSection':
      const section = `${navigation.config.title}`;
      switch (section) {
        case 'Vía Urbano':
          name = `Noticias de trap,rap y freestyle | ${section}`;
          break;
        case 'Vía Libre':
          name = `Noticias de farándula,y el mundo del espectáculo | ${section}`;
          break;
        case 'Vía Campo':
          name = `Noticias del campo y el sector agropecuario | ${section}`;
          break;
        case 'Vía Gourmet':
          name = `Noticias de recetas y gastronomía | ${section}`;
          break;
        case 'Vía Streaming':
          name = `Noticias de series y películas: Netflix Disney+ y más | ${section}`;
          break;
        default:
          name = `${navigation.config.title}`;
          name = name.replace('Vía', '');
          name = name.replace('País', 'Argentina');
          name = `Noticias de ${name} hoy |  Noticias ${name}`;
      }
      if (arcSite === 'via-pais-mexico') {
        name = `${navigation.config.title}`;
        name = name.replace('Vía', '');
        name = name.replace('País', 'México');
        name = `Noticias de ${name} hoy |  Noticias ${name}`;
      }
      break;
    case 'latestContentWithExclude':
    case 'latestContent':
      name = `Últimas Noticias`;
      break;
    case 'section':
      name = `${_.capitalize(
        !_.isEmpty(getSectionConfig(arcSite, globalContentConfig.query.section))
          ? getSectionConfig(arcSite, globalContentConfig.query.section).title
          : getSectionBySite(data.content_elements[0], arcSite).name
      )}`;
      name = `Noticias de ${name} hoy | Noticias ${name}`;
      if (arcSite === 'los-andes') {
        name = `${_.capitalize(
          getSectionBySite(data.content_elements[0], arcSite).name
        )}`;
        name = `Noticias de ${name}  hoy | Noticias ${name} `;
      }
      break;
    case 'subtype':
      const _subtype = properties.content.subtypes.find((subtype) => {
        return subtype._id === globalContentConfig.query.subtype;
      });
      name = `${_subtype.name}`;
      break;
    case 'galleries':
      name = `Galerías`;
      break;
    case 'sectionAndStory':
      if (!globalContent.contentSource?.includes('story')) {
        name = `${_.capitalize(globalContent.section.name)}`;

        const sectionName =
          globalContent.contentSource === 'subsection' &&
          globalContent?.section?.parent?.default
            ? properties?.content?.sections?.find((item) => {
                return item._id === globalContent.section.parent.default;
              })?.title || properties.site.name
            : properties.site.name;

        name = `${name} | Noticias de ${name}`;
      }
      break;
    default:
      name = ` ${
        properties.site.description ? `| ${properties.site.description}` : ''
      }`;
      if (arcSite === 'via-pais') {
        name = `Noticias de Argentina hoy | Noticias Argentina  | ${properties.site.name}`;
      }
      if (arcSite === 'via-pais-mexico') {
        name = `Noticias de México hoy | Noticias México  | ${properties.site.name}`;
      }
      break;
  }
  return name;
};

export default (
  data,
  navigation,
  requestUri,
  globalContent,
  globalContentConfig,
  arcSite,
  contextPath,
  author
) => {
  const properties = getProperties(arcSite);
  const values = {
    ...defaultValues(
      requestUri,
      arcSite,
      contextPath,
      globalContentConfig,
      data
    ),
    type: 'website',
    site: properties.site.name,
    tw_site:
      navigation.config &&
      navigation.config.socialMedia &&
      navigation.config.socialMedia.twitter
        ? navigation.config.socialMedia.twitter.account
        : properties.socialMedia.twitter &&
          properties.socialMedia.twitter.account,
    fb_page:
      navigation.config &&
      navigation.config.socialMedia &&
      navigation.config.socialMedia.facebook
        ? navigation.config.socialMedia.facebook.page
        : properties.socialMedia.facebook &&
          properties.socialMedia.facebook.page,
    fb_id:
      navigation.config &&
      navigation.config.socialMedia &&
      navigation.config.socialMedia.facebook
        ? navigation.config.socialMedia.facebook.id
        : properties.socialMedia.facebook && properties.socialMedia.facebook.id,
    noindex: navigation.config && navigation.config.noindex,
    indexFrom: navigation.config && navigation.config.indexFrom
  };

  const sectionTitle = getSectionTitle(
    globalContent,
    globalContentConfig,
    arcSite,
    data,
    navigation,
    author
  );
  values.title = sectionTitle;
  values.description = sectionTitle;
  const sectionWithPage = /(.*)\/([\d]+)\//;
  const matches = globalContentConfig?.query
    ? sectionWithPage.exec(`${_.trimEnd(globalContentConfig.query.uri, '/')}/`)
    : undefined;
  if (
    (!_.isUndefined(globalContentConfig.query) &&
      !_.isUndefined(globalContentConfig.query.feedPage) &&
      globalContentConfig.query.feedPage > 1) ||
    matches
  ) {
    values.title += ` | Página ${
      matches ? matches[2] : globalContentConfig.query.feedPage
    }`;
    if (
      arcSite === 'la-voz' &&
      globalContentConfig.source === 'sectionAndStory'
    ) {
      values.description = `Página ${
        matches ? matches[2] : globalContentConfig.query.feedPage
      } | Todas las noticias de ${sectionTitle.split(' ')[0]} en ${
        properties.site.name
      } `;
    } else {
      values.description += ` | Página ${
        matches ? matches[2] : globalContentConfig.query.feedPage
      } | ${properties.site.name}`;
    }
  }
  values.title += ` | ${properties.site.name}`;
  if (arcSite === 'la-voz' && !globalContentConfig.source) {
    (values.description = 'La Voz del Interior'),
      (values.title = 'La Voz del Interior');
  }
  if (arcSite === 'los-andes' && !globalContentConfig.source) {
    (values.description = 'Los Andes | Periodismo de verdad.'),
      (values.title = 'Los Andes | Periodismo de verdad.');
  }
  if (arcSite === 'voy-de-viaje' && !globalContentConfig.source) {
    (values.description = 'Voy de Viaje'), (values.title = 'Voy de Viaje');
  }
  return values;
};
