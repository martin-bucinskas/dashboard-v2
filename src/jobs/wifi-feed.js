const gsheets = require('../../middleware/google/gsheets');

export const interval = '*/1 * * * *';
export const perform = async () => {
  let wifiPassword = '';
  await gsheets.getLatestWifiPassword().then(response => {
    wifiPassword = response;
  });

  return [
    {
      target: 'WiFi',
      data: {
        value: wifiPassword[0].wifiPassword,
      },
    },
  ];
};
