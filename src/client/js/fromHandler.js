import { updateModal, closeModal } from './UIupdate';
import { getDays } from './daysBtwDates';
import {
  getCoordinates,
  getWeather,
  getImage,
  getCountryFlag,
} from './APIData';

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

  updateModal(
    countryName,
    countryFlag,
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

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
