const fetchData = async (resource, data) => {
  const res = await fetch(`http://localhost:3000/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
};

const getCoordinates = async (locationObj) => {
  return await fetchData('geonames', locationObj);
};

const getWeather = async (coordinatesObj) => {
  return await fetchData('weather', coordinatesObj);
};

const getImage = async (locationObj) => {
  return await fetchData('image', locationObj);
};

const getCountryFlag = async (countryNameObj) => {
  return await fetchData('flag', countryNameObj);
};

export { getCoordinates, getWeather, getImage, getCountryFlag };
