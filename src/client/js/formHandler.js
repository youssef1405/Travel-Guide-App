const handleSubmit = async (e) => {
  e.preventDefault();
  const locationValue = document.getElementById('location').value;
  console.log(locationValue);
  const res = await fetch('http://localhost:3000/geonames', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location: locationValue }),
  });
  const data = await res.json();
  console.log(data);
};

document.getElementById('form').addEventListener('submit', handleSubmit);

export { handleSubmit };
