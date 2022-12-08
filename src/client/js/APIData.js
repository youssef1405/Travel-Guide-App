const getCoordinates = async (location) => {
  const res = await fetch('http://localhost:3000/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });
  return await res.json();
};

const getWeather = async (lng, lat, days) => {
  const res = await fetch('http://localhost:3000/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, days }),
  });
  const weatherData = await res.json();

  return weatherData;
};

const getImage = async (location) => {
  const res = await fetch('http://localhost:3000/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });

  const imageUrl = await res.json();

  return imageUrl;
};

export { getCoordinates, getWeather, getImage };
