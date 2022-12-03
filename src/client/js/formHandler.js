const handleSubmit = async (e) => {
  e.preventDefault();
  const locationValue = document.getElementById('location').value;
  console.log(locationValue);
  const res = await fetch('http://localhost:3000/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: locationValue }),
  });
  const coordinates = await res.json();
  getWeather(coordinates);
};

const getWeather = async ({ lng, lat }) => {
  const res = await fetch('http://localhost:3000/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng }),
  });
  const weatherData = await res.json();
  const { temp } = weatherData;
  console.log(temp);
};

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
