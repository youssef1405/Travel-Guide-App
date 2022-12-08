import { updateModal, closeModal } from './UIupdate';
import { getDays } from './dates';

const handleSubmit = async (e) => {
  e.preventDefault();
  const locationValue = document.getElementById('location').value;
  const departureValue = document.getElementById('departure').value;
  const arrivalValue = document.getElementById('arrival').value;

  const res = await fetch('http://localhost:3000/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: locationValue }),
  });
  const { lat, lng, countryName } = await res.json();

  const { temp, clouds, wind_spd, app_temp } = await getWeather(
    lng,
    lat,
    getDays(departureValue)
  );

  const duration = getDays(arrivalValue) - getDays(departureValue);
  const imageUrl = await getImage(locationValue);
  updateModal(
    countryName,
    locationValue,
    imageUrl,
    departureValue,
    arrivalValue,
    getDays(departureValue),
    duration,
    temp,
    clouds,
    wind_spd,
    app_temp
  );
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

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
