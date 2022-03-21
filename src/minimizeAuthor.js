const socialLinks = [
  "email",
  "twitter",
  "youtube",
  "linkedin",
  "instagram",
  "facebook"
];

const minimizeAuthor = author => {
  return {
    ...author,
    byline:
      (author.additional_properties &&
        author.additional_properties.original.byline) ||
      author.byline,
    bio:
      (author.additional_properties &&
        (author.additional_properties.original.bio ||
          author.additional_properties.original.longBio)) ||
      author.bio ||
      author.longBio,
    image: (author.image && author.image.url) || author.image, // TODO: ver como trae en vp y en la
    social_links:
      author.socialLinks ||
      socialLinks.map(link => {
        return { site: link, url: author[link] };
      })
  };
};

export default minimizeAuthor;
