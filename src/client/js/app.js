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

  // form data: city name, departure date, arrival date
  const locationValue = document.getElementById('location').value;
  const departureValue = document.getElementById('departure').value;
  const arrivalValue = document.getElementById('arrival').value;

  // data retrieved from the geonames api: lat, lang, country
  const { lat, lng, countryName } = await getCoordinates({ locationValue });

  // data extracted from the RESTcounties api: flag of country(url)
  const { countryFlag } = await getCountryFlag({ countryName });

  // number of days from today's date
  const daysAway = getDays(departureValue);

  // weather data from the weatherbit api
  // temperature, clouds status and windpseed
  const { temp, clouds, wind_spd } = await getWeather({
    lng,
    lat,
    daysAway,
  });

  // data retrieved from the pixabay api
  const imageUrl = await getImage({ locationValue });
  console.log(imageUrl);

  // number of of days btw the departure date and arrival date
  const duration = getDays(arrivalValue) - getDays(departureValue);

  // store all APIs data in the appData object
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
  });

  updateModal(appData); // populates the modal trip with data
};

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
