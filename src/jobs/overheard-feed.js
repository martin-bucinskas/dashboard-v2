const gsheets = require('../../middleware/google/gsheets');

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

export const interval = '*/1 * * * *';
export const perform = async () => {
  const overheard = [];
  await gsheets.getAllOverheard().then(response => {
    shuffle(response).forEach(item => {
      overheard.push({
        text: item,
      });
    });
  });

  return [
    {
      target: 'Overheard',
      data: {
        value: overheard,
      },
    },
  ];
};
