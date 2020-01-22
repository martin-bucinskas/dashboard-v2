import request from 'request-promise-native';

// TODO: Add timeout to options
const options = {
  uri: 'https://tfgm.com/api/statuses/tram',
  headers: {
    'User-Agent': 'ET-Dashboard',
  },
  json: true,
};

export const interval = '*/10 * * * *';
export const perform = async () => {
  const response = await request(options);

  return [
    {
      target: 'ManchesterTrams',
      data: {
        value: response,
      },
    },
  ];
};
