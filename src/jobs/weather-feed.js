import request from 'request-promise-native';

require('dotenv').config();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const URI = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=London&units=metric`;

// TODO: Add timeout to options
const options = {
  uri: URI,
  headers: {
    'User-Agent': 'ET-Dashboard',
  },
  json: true,
};

export const interval = '*/1 * * * *';
export const perform = async () => {
  const response = await request(options);
  let rainFlag = true;
  if (response.weather[0].main === 'Rain') {
    rainFlag = true;
  }

  return [
    {
      target: 'WeatherWidget',
      data: {
        value: response,
      },
    },
    {
      target: 'Dashboard',
      data: {
        isRaining: rainFlag,
      },
    },
  ];
};
