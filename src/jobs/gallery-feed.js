const gdrive = require('../../middleware/google/gdrive');

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const interval = '*/* 2 * * *';
export const perform = async () => {
  let imageUrls = '';
  await gdrive.getAllGalleryImages().then(response => {
    imageUrls = response;
  });

  const packedGalleryImages = [];

  shuffle(imageUrls).forEach(url => {
    const link = url.thumbnailLink.slice(0, -5);
    packedGalleryImages.push({
      original: link,
    });
  });

  return [
    {
      target: 'Gallery',
      data: {
        value: packedGalleryImages,
      },
    },
  ];
};
