import _ from 'lodash';

export default function getAuthorById(articleObject, id) {
  const authors = articleObject.credits.by || [];
  return _.find(authors, (author) => {
    return author._id === id;
  });
}
