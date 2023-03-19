export default (articleObject, id) => {
  const { by: authors = [] } = articleObject.credits || {};
  const author = authors.find((author) => author._id === id);
  return author;
};
