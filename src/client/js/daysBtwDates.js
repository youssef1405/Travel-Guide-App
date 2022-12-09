/**
 *
 * @param {*} departureDate Departure Date of the trip
 * @returns Number of of days between today and the departure date
 */
const getDays = (departureDate) => {
  const MILSECONDS_TO_DAYS = 86400000; // to convert millseconds to days

  const todayDate = new Date();
  departureDate = new Date(departureDate);
  return (
    (new Date(
      departureDate.getFullYear(),
      departureDate.getMonth(),
      departureDate.getDate() + 1
    ) -
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      ).getTime()) /
    MILSECONDS_TO_DAYS
  );
};

export { getDays };
