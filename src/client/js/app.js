import { updateModal, closeModal } from './UIupdate';
import { getDays } from './daysBtwDates';
import {
  getCoordinates,
  getWeather,
  getImage,
  getCountryFlag,
} from './APIData';

const appData = {}; // store trip data

const handleSubmit = async (e) => {
  e.preventDefault();

  const locationValue = document.getElementById('location').value;
  const departureValue = document.getElementById('departure').value;
  const arrivalValue = document.getElementById('arrival').value;
  const { lat, lng, countryName } = await getCoordinates(locationValue);
  const { countryFlag } = await getCountryFlag(countryName);
  const { temp, clouds, wind_spd, app_temp } = await getWeather(
    lng,
    lat,
    getDays(departureValue)
  );
  const imageUrl = await getImage(locationValue);
  const duration = getDays(arrivalValue) - getDays(departureValue);
  const daysAway = getDays(departureValue);

  Object.assign(appData, {
    locationValue,
    departureValue,
    arrivalValue,
    countryName,
    countryFlag,
    imageUrl,
    daysAway,
    duration,
    temp,
    clouds,
    wind_spd,
    app_temp,
  });

  updateModal(appData);
};

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
