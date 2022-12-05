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
  const url = `${baseUrl}${req.body.location}&maxRows=5&username=${process.env.GEONAMES_API_USERNAME}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { lat, lng } = data['geonames'][0];
      console.log(lat, lng);
      res.send({ lat, lng });
    });
});

app.post('/weather', async (req, res) => {
  const { lat, lng, days } = req.body;
  const currentBaseUrl = 'https://api.weatherbit.io/v2.0/current?key';
  const forcastBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?key';

  const url = `${days <= 7 ? currentBaseUrl : forcastBaseUrl}=${
    process.env.WEATHER_API_KEY
  }&lat=${lat}&lon=${lng}`;
  console.log(url);
  const response = await fetch(url);
  const weatherData = await response.json();
  const { temp, weather } =
    days <= 7 ? weatherData.data[0] : weatherData.data[15];
  res.send({ temp });
});

app.post('/image', async (req, res) => {
  const baseUrl = 'https://pixabay.com/api/?key=';
  const url = `${baseUrl}${process.env.PIXABAY_API_KEY}&q=${req.body.location}`;
  const response = await fetch(url);
  const pixaData = await response.json();

  res.send({
    imageUrl:
      pixaData.hits[Math.floor(Math.random() * pixaData.hits.length) + 1][
        'previewURL'
      ],
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
