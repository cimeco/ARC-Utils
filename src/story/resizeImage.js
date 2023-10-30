import { THUMBOR_KEY } from 'fusion:environment';
import _ from 'lodash';
import Thumbor from 'thumbor';

export default function resizeImage(imageObject, size, serverUrl) {
  const { width, height } = size;
  const thumbor = new Thumbor(THUMBOR_KEY, serverUrl);
  const filterQuality = 75;

  const hasFocalPoint =
    !_.isNil(imageObject) && !_.isNil(imageObject.focal_point);
  const urlWithoutProtocol =
    !_.isNil(imageObject) && !_.isNil(imageObject.url)
      ? imageObject.url.replace(/https?:\/\//, '')
      : undefined;

  if (!urlWithoutProtocol) return undefined;
  const computeCrop = () => {
    const {
      width: imageWidth,
      height: imageHeight,
      focal_point: { x: positionX, y: positionY }
    } = imageObject;

    if (imageWidth === 0 || imageHeight === 0 || width === 0 || height === 0) {
      return [0, 0, 0, 0];
    }
    const isWide = width / imageWidth < height / imageHeight;

    const croppable = Math.round(
      isWide
        ? imageWidth - (width * imageHeight) / height
        : imageHeight - (height * imageWidth) / width
    );

    const left = isWide ? croppable * (positionX / imageWidth) : 0;
    const top = isWide ? 0 : croppable * (positionY / imageHeight);
    const right = isWide ? imageWidth - (croppable - left) : imageWidth;
    const bottom = isWide ? imageHeight : imageHeight - (croppable - top);

    return [left, top, right, bottom].map((item) => {
      return Math.round(Math.abs(item));
    });
  };

  if (_.isNil(urlWithoutProtocol)) {
    return undefined;
  }

  return hasFocalPoint
    ? thumbor
        .setImagePath(urlWithoutProtocol)
        .crop(...computeCrop())
        .filter(`quality(${filterQuality})`)
        .filter(`format(webp)`)
        .resize(width, height)
        .buildUrl()
    : thumbor
        .setImagePath(urlWithoutProtocol)
        .resize(width, height)
        .filter(`quality(${filterQuality})`)
        .filter(`format(webp)`)
        .smartCrop(true)
        .buildUrl();
}
