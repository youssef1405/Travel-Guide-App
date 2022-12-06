// Global variables

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const imgHTML = document.querySelector('.modal-img');
const tripTitleHTML = document.querySelector('.trip-title');
const departureHTML = document.querySelector('.modal-departure');
const arrivalHTNL = document.querySelector('.modal-arrival');
const durationHTML = document.querySelector('.modal-trip-duration');
const daysHTML = document.querySelector('.modal-days');
const tempHTML = document.querySelector('.temp');
const feelsLikeHTML = document.querySelector('.feels-like');
const windSpeedHTML = document.querySelector('.wind-speed');
const cloudsHTML = document.querySelector('.clouds');

const updateModal = (
  country,
  city,
  imageUrl,
  departureDate,
  arrivalDate,
  daysAway,
  duration,
  temp,
  clouds,
  windSpeed,
  feelsLike
) => {
  imgHTML.src = `${imageUrl.imageUrl}`;
  tripTitleHTML.innerHTML = `Trip to: ${city}, ${country}`;
  departureHTML.innerHTML = `<span class="title">Departure: </span> ${departureDate}`;
  arrivalHTNL.innerHTML = `<span class="title">Arrival: </span> ${arrivalDate}`;
  durationHTML.innerHTML = `<span class="title">Duration: </span>${duration} days`;
  daysHTML.textContent = `Your trip to ${city} is ${daysAway} day(s) away`;
  tempHTML.textContent = `Temperature: ${Math.round(temp)}C`;
  feelsLikeHTML.textContent = `Feels Like: ${Math.round(feelsLike)}C`;
  windSpeedHTML.textContent = `Wind Speed: ${windSpeed}`;
  cloudsHTML.textContent = `${clouds} throughout the day`;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

document.body.addEventListener('click', closeModal);

export { updateModal, closeModal };
