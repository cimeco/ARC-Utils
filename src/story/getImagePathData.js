export default function getImagePathData(article, show) {
  return {
    showAuthor: show,
    path: show ? article.credits.by[0] : article.promo_items,
    imagePath: show ? 'image' : 'basic',
    captionPath: show ? 'name' : 'basic.subtitle',
    creditPath: show ? '' : 'basic.credits.by[0].name'
  };
}
