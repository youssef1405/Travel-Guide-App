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
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  // res.send('Travel App');
  res.sendFile(path.resolve('src/client/views/index.html'));
});

//api.geonames.org/searchJSON?q=toronto&maxRows=5&username=
// https://api.weatherbit.io/v2.0/current?key=&lat=43.70011&lon=-79.4163
//https://pixabay.com/api/?key=&q=toronto

app.post('/geonames', (req, res) => {
  const baseUrl = 'http://api.geonames.org/searchJSON?q=';
  const url = `${baseUrl}${req.body.location}&maxRows=5&username=${process.env.GEONAMES_API_USERNAME}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data['geonames'][0]));
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
