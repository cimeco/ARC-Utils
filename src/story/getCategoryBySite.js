export default function getCategoryBySite(articleObject) {
  const getCategory = () => {
    return articleObject.taxonomy.sections && articleObject.taxonomy.sections[1]
      ? articleObject.taxonomy.sections[1]
      : undefined;
  };

  const getCategoryId = (category) => {
    return category.type === 'reference' ? category.referent.id : category._id;
  };

  return getCategory() !== undefined
    ? getCategoryId(getCategory()).split('/').join('')
    : undefined;
}
