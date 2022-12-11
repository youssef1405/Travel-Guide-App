const fetch = require('node-fetch');

const fetchData = async (resource, data) => {
  const res = await fetch(`http://localhost:8000/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

/**
 * it returns the coordinates of a city
 * @param {*} locationObj city name
 * @returns location coordinates
 */
const getCoordinates = async (locationObj) => {
  return await fetchData('geonames', locationObj);
};

/**
 * it returns the weather data from Weatherbit API
 * @param {*} coordinatesObj lat and lang of city
 * @returns weather data
 */
const getWeather = async (coordinatesObj) => {
  return await fetchData('weather', coordinatesObj);
};

/**
 * this function returns the image url that was pulled
 * from the pixabay api
 * @param {*} locationObj city name
 * @returns url of an image
 */
const getImage = async (locationObj) => {
  return await fetchData('image', locationObj);
};

/**
 * this function returns the url of flag image of specfic country
 * @param {*} countryNameObj name of country
 * @returns url of an image of country flag
 */
const getCountryFlag = async (countryNameObj) => {
  return await fetchData('flag', countryNameObj);
};

export { getCoordinates, getWeather, getImage, getCountryFlag, fetchData };
