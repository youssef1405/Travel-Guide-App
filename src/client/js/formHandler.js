const handleSubmit = async (e) => {
  e.preventDefault();
  // for (const value of new FormData(e.target).values()) {
  //   console.log(value);
  // }
  const locationValue = document.getElementById('location').value;
  console.log(locationValue);
  fetch('/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: locationValue }),
  });
};

document.getElementById('form').addEventListener('submit', handleSubmit);
