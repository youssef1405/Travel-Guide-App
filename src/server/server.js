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
  // res.send('Travel App');
  res.sendFile(path.resolve('dist/index.html'));
});

//api.geonames.org/searchJSON?q=toronto&maxRows=5&username=
// https://api.weatherbit.io/v2.0/current?key=369dba7cc0a84aa5aff919c795041df1&lat=43.70011&lon=-79.4163
//https://pixabay.com/api/?key=&q=toronto

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
  const basUrl = 'https://api.weatherbit.io/v2.0/current?key';
  const url = `${basUrl}=${process.env.WEATHER_API_KEY}&lat=${req.body.lat}&lon=${req.body.lng}`;
  const response = await fetch(url);
  const weatherData = await response.json();
  const { temp, weather } = weatherData.data[0];
  // console.log(weatherData.data[0].temp);
  res.send({ temp });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
