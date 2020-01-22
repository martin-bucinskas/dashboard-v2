import request from 'request-promise-native';

const nearbyLines = [
  'bakerloo',
  'central',
  'northern',
  'circle',
  'hammersmith-city',
  'victoria',
  'jubilee',
];

// TODO: Add timeout to options
const options = {
  uri: 'https://api.tfl.gov.uk/line/mode/tube/status',
  headers: {
    'User-Agent': 'ET-Dashboard',
  },
  json: true,
};

export const interval = '*/1 * * * *';
export const perform = async () => {
  const response = await request(options);
  // eslint-disable-next-line max-len
  const nearbyTubeLineStatuses = response.filter(item => nearbyLines.includes(item.id.toLowerCase()));

  return [
    {
      target: 'LondonUnderground',
      data: {
        value: nearbyTubeLineStatuses,
      },
    },
  ];
};
