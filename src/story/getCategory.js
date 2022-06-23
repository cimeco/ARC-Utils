import getSectionFromConfig from './getSectionFromConfig';

export default function getCategory(articleObject) {
  const getCategory = () => {
    return articleObject.taxonomy.sections &&
      articleObject.taxonomy.sections[1] &&
      articleObject.taxonomy.sections[1].type !== 'reference'
      ? getSectionFromConfig(articleObject.taxonomy.sections[1], 'via-pais')
      : undefined;
  };

  return getCategory() !== undefined
    ? getCategory()._id.split('/').join('')
    : undefined;
}
