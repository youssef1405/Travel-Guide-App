// Global variables

// holds and displays the trip data
const modal = document.querySelector('.modal');
// makes the backougroud a bit darker when the modal pops up
const overlay = document.querySelector('.overlay');
// parent element of all the trips
const main = document.getElementById('main');

/**
 * This function populates the modal with data extracted from the APIs
 */
const updateModal = (appData) => {
  overlay.classList.remove('hidden');
  let modalSection = document.createElement('section');
  modalSection.classList.add('modal', 'modal-main');

  modalSection.innerHTML = `
  <header class="modal-header">
    <img class="country-flag" alt="Destination Flag" src=${
      appData.countryFlag
    } />
    <span class="country-name">${appData.countryName}</span>
  </header>
  <div class="modal-body">
    <img class="modal-img" src="${appData.imageUrl.imageUrl}" alt="" />
    <div class="modal-trip-info">
      <h2 class="trip-title modal-title">Trip to: ${appData.locationValue}, ${
    appData.countryName
  }</h2>
      <p class="modal-departure"><span class="title">Departure: </span> ${
        appData.departureValue
      }</p>
      <p class="modal-arrival"><span class="title">Arrival: </span> ${
        appData.arrivalValue
      }</p>

      <p class="modal-trip-duration"><span class="title">Duration: </span>${
        appData.duration
      } days</p>
      <p class="modal-days">Your trip to ${appData.locationValue} is ${
    appData.daysAway
  } day(s) away</p>
      <h3>Typical Weather for then is:</h3>
      <div class="modal-weather-container">
        <div class="temp">Temperature: ${Math.round(appData.temp)}C</div>
        <div class="wind-speed">Wind Speed: ${Math.round(
          appData.wind_spd
        )}</div>
      </div>
      <div class="clouds">${appData.clouds} throughout the day</div>
    </div>
  </div>
  <div class="modal-buttons-container">
    <button class="btn modal-save-btn" onclick="Client.addTrip()">Save Trip</button>
    <button class="btn modal-cancel-btn" onclick="Client.closeModal()">Cancel</button>
  </div>
  `;

  main.appendChild(modalSection);
};

/**
 * This function unhides the trip section which is a child of the
 * main element(container for all trips)
 */
const addTrip = () => {
  const modals = document.querySelectorAll('.modal');
  for (const modal of modals) {
    if (modal.classList.contains('modal-main')) {
      modal.classList.remove('modal-main');
      modal.classList.add('trip');

      // remove button from the modal after being added to trips list.
      modal.querySelector('.modal-buttons-container').remove();
    }
  }
  overlay.classList.add('hidden');
};

/**
 * This function closes the trip modal once the "Cancel" button is clicked
 * or clicking outside the modal
 */
function closeModal() {
  document.querySelector('.modal-main').remove();
  overlay.classList.add('hidden');
}

overlay.addEventListener('click', closeModal);

export { updateModal, closeModal, addTrip };
