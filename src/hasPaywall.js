const hasPaywall = article => {
  return (
    article &&
    article.content_restrictions &&
    article.content_restrictions.content_code === "premium"
  );
};
export default hasPaywall;
