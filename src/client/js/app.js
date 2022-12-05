const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const location = document.querySelector('.location');
const date = document.querySelector('.date');
const tempHTML = document.querySelector('.temp');
const img = document.querySelector('.img-location');

const handleSubmit = async (e) => {
  e.preventDefault();
  const locationValue = document.getElementById('location').value;
  const departureValue = document.getElementById('departure').value;

  const res = await fetch('http://localhost:3000/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: locationValue }),
  });
  const coordinates = await res.json();
  const temperature = await getWeather(coordinates, getDays(departureValue));
  const imageUrl = await getImage(locationValue);
  displayData(temperature, imageUrl);
};

const getWeather = async ({ lng, lat }, days) => {
  const res = await fetch('http://localhost:3000/weather', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat, lng, days }),
  });
  const weatherData = await res.json();
  const { temp } = weatherData;
  console.log(temp);
  return temp;
};

const getImage = async (location) => {
  const res = await fetch('http://localhost:3000/image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location }),
  });

  const imageUrl = await res.json();
  console.log(imageUrl);
  return imageUrl;
};

const displayData = (temp, imageUrl) => {
  console.log('from display data', temp, imageUrl);
  tempHTML.textContent = `Temperature: ${temp}`;
  img.src = `${imageUrl.imageUrl}`;
  // img.src =
  //   'https://pixabay.com/get/gbad0e3e9aa9ad8d6015ebb58030c8896d0a4a7868472f419438afa763ff82fbcfd2e3665ed024886fdb329c161ca56c3332ef3de9ab160ad5f9521c02a197e95_640.jpg';
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
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

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.getElementById('form').addEventListener('submit', handleSubmit);
document.body.addEventListener('click', closeModal);

export { handleSubmit };
