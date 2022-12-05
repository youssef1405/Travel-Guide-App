import { updateModal, closeModal } from './UIupdate';

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

  const duration = 5;
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

/**
 *
 * @param {*} departureDate Departure Date of the trip
 * @returns Number of of days between today and the departure date
 */
const getDays = (departureDate) => {
  const MILSECONDS_TO_DAYS = 86400000; // to convert millseconds to days

  const todayDate = new Date();
  const deptDate = new Date(departureDate);

  return (
    (new Date(
      deptDate.getFullYear(),
      deptDate.getMonth(),
      deptDate.getDate() + 1
    ) -
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      ).getTime()) /
    MILSECONDS_TO_DAYS
  );
};

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
