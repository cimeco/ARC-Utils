import _ from "lodash";

export default (articleObject, id) => {
  const authors = articleObject.credits.by || [];
  return _.find(authors, author => {
    return author._id === id;
  });
};
