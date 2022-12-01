const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('Travel App');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
