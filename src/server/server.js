const { app } = require('./app');

const testServer = () => {
  console.log('App running on port 8000');
};
app.listen(8000, testServer);
