// eslint-disable-next-line import/prefer-default-export
export const blobToImage = (binaryUrl) => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');
  img.src = binaryUrl;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  return canvas.toDataURL();
};
