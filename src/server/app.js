const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

//serve static files
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.post('/geonames', (req, res) => {
  const baseUrl = 'http://api.geonames.org/searchJSON?q=';
  const url = `${baseUrl}${req.body.locationValue}&maxRows=5&username=${process.env.GEONAMES_API_USERNAME}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { lat, lng, countryName } = data['geonames'][0];
      res.send({ lat, lng, countryName });
    });
});

/**
 * this function returns the base url depending on the number of days
 * @param {*} daysAway number of days between today and departure date
 * @returns url
 */
const getBaseUrl = (daysAway) => {
  const currentBaseUrl = 'https://api.weatherbit.io/v2.0/current?key';
  const forcastBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?key';

  return daysAway <= 7 ? currentBaseUrl : forcastBaseUrl;
};

app.post('/weather', async (req, res) => {
  const { lat, lng, daysAway } = req.body;
  const baseUrl = getBaseUrl(daysAway);
  const response = await fetch(
    `${baseUrl}=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lng}`
  );
  const weatherData = await response.json();
  const { temp, weather, wind_spd } =
    daysAway <= 7
      ? weatherData.data[0]
      : weatherData.data[weatherData.data.length - 1];
  const clouds = weather.description;
  res.send({ temp, clouds, wind_spd });
});

const getImage = async (locationValue) => {
  const baseUrl = 'https://pixabay.com/api/?key=';
  const url = `${baseUrl}${process.env.PIXABAY_API_KEY}&q=${locationValue}`;
  const response = await fetch(url);
  return await response.json();
};

app.post('/image', async (req, res) => {
  const pixaData = await getImage(req.body.locationValue);
  res.send({
    imageUrl:
      pixaData.hits[Math.floor(Math.random() * pixaData.hits.length) - 1][
        'previewURL'
      ],
  });
});

app.post('/flag', async (req, res) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${req.body.countryName}`
  );
  const CountryData = await response.json();
  const countryFlag = CountryData[0]['flags']['png'];
  res.send({ countryFlag });
});

module.exports = { getBaseUrl, app };
